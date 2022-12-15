const userSessionChecker=(req,res,next)=>{
    if(req.session.useremail){
        next()
    }else{
        console.log("========= session not clear");
        res.redirect("/",{admin:false,user:false})
    }
}

const adminSessonChecker =(req,res,next)=>{
    if(req.session.Email){
        next()
    }
    else{
        res.render('admin/login',{admin:false,user:false})
    }
}

module.exports={
    userSessionChecker,
    adminSessonChecker,
}