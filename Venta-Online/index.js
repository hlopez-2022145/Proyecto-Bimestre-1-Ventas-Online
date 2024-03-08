import { initServer } from './configs/app.js'
import { connect  } from './configs/mongo.js'
import Category from './src/category/category.model.js'
import User from './src/user/user.model.js'
import { encrypt } from './src/utils/validator.js'

async function categoryDefault () {
    try{
        let categoryExists = await Category.findOne({categoryName: 'Others'})
    
        if(categoryExists){
            return console.log('The category already exists in the database ')
        }

        let newCategory = new Category({
            categoryName: 'Others',
            description: 'This category is default'
        })

        let categorySave = await newCategory.save()
        console.log('Category created successfully', categorySave)
    }catch(err){
        console.error({msg: 'Error creating category ', err})
    }
}

async function adminDefatult () {
    try{
        let usserExist = await User.findOne({role: 'ADMIN'})
        if(usserExist){
            return console.log('The user already exists in the database')
        }

        let newUser = new User({
            name: 'Josue',
            surname: 'Noj',
            email: 'jnoj@kinal.edu.gt',
            username: 'jnoj',
            password: '12345678',
            role: 'ADMIN'
        })
        newUser.password = await encrypt(newUser.password)
        let userSave = await newUser.save()
        console.log('User created successfully', userSave)
    }catch(err){
        console.error({msg: 'Error creating admin'})
    }
}

initServer() 
connect()
categoryDefault()
adminDefatult()