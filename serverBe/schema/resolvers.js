import User from '../models/users';
export const resolvers = {
    Query: {
        async allUser() {
            return await User.find();
        }
    }
}