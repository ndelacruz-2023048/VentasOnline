
import { comparePassword } from '../../utils/encrypt.js';
import { generateJwt } from '../../utils/jwt.js';
import Admin from '../admin/admin.model.js';

export const login = async (request, response) => {
    try {
        let { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).send({ success: false, message: 'Email and password are required' });
        }

        let isValidUser = await Admin.findOne({email})
        let isValidPassword = await comparePassword(isValidUser.password,password)
        if(!isValidUser || !isValidPassword){
            return response.status(400).send({ success: false, message: 'Invalid credentials' });
        }
        console.log(isValidUser);
        let loginUser = {
            uid: isValidUser._id,
            username: isValidUser.email,
            name: isValidUser.name,
            role: isValidUser.role
        }

        let token = generateJwt(loginUser)

        response.status(200).send({ success: true, message: 'Login success',user: loginUser , token});
    } catch (error) {
        response.status(500).send({success:false,message:'General Server error',error})
    }
}