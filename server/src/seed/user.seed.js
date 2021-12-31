import { UserModel } from "../models/user.model.js";

export const seedUser = () => {

    const user = [
        new UserModel({
            name: "Admin",
            email: "admin@xyz.com",
            password: "$2b$10$JXAK4Sh/8gziUth9ll8oDOK2gsPFScyDkQsUTbzN3oSP0muDCxGTi",
            dob: "2022-01-01",
            phone: "012345678910",
            gender:"Male",
            address:"23/A, CA"
        }),
    ];

    const seedUserDB = async () => {
        await UserModel.deleteMany({});
        await UserModel.insertMany(user);
    };

    seedUserDB();
    
    // seedDB().then(() => {
    //     mongoose.connection.close();
    // })

}
