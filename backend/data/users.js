import bcrypt from 'bcryptjs'

const user = [
    {
        name:"Admin",
        email:"admin@kampala.co.uk",
        password:bcrypt.hashSync("Agbeke66#",12),
        isAdmin:true,
    },
    {
        name:"Tomisin Olujimi",
        email:"olu_tomi@aol.com",
        password:bcrypt.hashSync("Olutomi123#",12),
        isAdmin:false,
    },
    {
        name:"contact",
        email:"contact@kampala.co.uk",
        password:bcrypt.hashSync("contact#",12),
        isAdmin:true,
    },
    {
        name:"shipping",
        email:"shipping@kampala.co.uk",
        password:bcrypt.hashSync("Agbeke66#",12),
        isAdmin:true,
    },
    {
        name:"review",
        email:"review@kampala.co.uk",
        password:bcrypt.hashSync("kampala#",12),
        isAdmin:true,
    },
]

export default user;

