const { PrismaClient } = require("@prisma/client");
const { totp } = require("otplib");
const bcrypt = require("bcrypt");
const sendSmsToEmail = require("../config/sendSmsToEmail");
const prisma = new PrismaClient()
const DeviceDetector = require("device-detector-js");
const deviceDetector = new DeviceDetector();
const jwt = require("jsonwebtoken")

totp.options = {
    step: 300,
    digits: 5
}

const refreshTokens = new Set()

class UserService {
    async sendOtp (data) {
        const { email } = data;
        const secret = email + "bugun";
        const otp = totp.generate(secret);
        await sendSmsToEmail(email, otp);
        return { otp };
    }

    async verifyOtp (data) {
        const { email, otp } = data;
        const secret = email + "bugun";
        const isValid = totp.verify({ token: otp, secret: secret});
        if (isValid) {
            return { message: "OTP verified successfully"}
        }
        return { message: "invalid OTP" }
    }

    async userRegistration(data) {
        const { password, email, ...rest } = data;
        const hashedPassword = bcrypt.hashSync(password, 10);

        const findByEmail = await prisma.user.findFirst({
            where: { email }
        });

        if (findByEmail) {
            return { message: "User already exists" }
        }

        return await prisma.user.create({
            data: {
                ...rest,
                email,
                password: hashedPassword,
            }
        })
    }

    async userLogined(data, userIp, userAgent) {
        const { email, password } = data;
        const JWT_SECRET = process.env.JWT_SECRET;
        const REFRESH_SECRET = process.env.REFRESH_SECRET;

        const findUser = await prisma.user.findFirst({
            where: {
                email
            }
        });
        if (!findUser) {
            return { status: 404, message: "User not found" }
        }
        const matchPassword = bcrypt.compareSync(password, findUser.password);

        if (!matchPassword) {
            return { message: "Password wrong error" }
        }

        const deviceData = deviceDetector.parse(userAgent);
        const accessToken = jwt.sign(
            {
                id: findUser.id,
                role: findUser.role,
                userIp: userIp,
            },
            JWT_SECRET,
            { expiresIn: "1h" }
        );
        const refreshtoken = jwt.sign(
            { id: findUser.id, userIp: userIp, role: findUser.role },
            REFRESH_SECRET,
            { expiresIn: "7d" }
        );
        refreshTokens.add(refreshtoken);

        const sessions = await prisma.session.findFirst({
            where: {
                userId: findUser.id,
                ipAddress: userIp
            }
        });
        if (!sessions) {
            await prisma.session.create({
                data: {
                    userId: findUser.id,
                    ipAddress: userIp,
                    deviceData: deviceData
                }
            })
        }
        return { accessToken, refreshtoken }
    }
    //////////////////////////////
    async getData (take, skip, column, order) {
        
        return prisma.user.findMany({
            where: {},  
            take: take || 10,  
            skip: skip || 0,   
            orderBy: {
                [column]: order === "DESC" ? "desc" : "asc",  
            },
        })
    }
    async getDataById (id) {
        const findData = await prisma.user.findFirst({where: {id: parseInt(id)}})
        if (!findData) {
            return {status: 404, message: "User not found"}
        }
        return prisma.user.findUnique({where: {id: parseInt(id)}})
    }
    async createNewUser (data){ 
        return prisma.user.create({data})
    }
    async updateUser (id, data){
        const findData = await prisma.user.findFirst({where: {id: parseInt(id)}})
        if (!findData) {
            return {status: 404, message: "User not found"}
        }
        return prisma.user.update({
            where: { id: parseInt(id) },
            data
        })
    }
    async deleteUser (id) {
        const findData = await prisma.user.findFirst({where: {id: parseInt(id)}})
        if (!findData) {
            return {status: 404, message: "User not found"}
        }
        return prisma.user.delete({where: {
            id: parseInt(id)
        }})
    }
};

const userService = new UserService();
module.exports = userService