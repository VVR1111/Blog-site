var express=require("express"),
    app    =express(),
    mongoose=require("mongoose"),
	bodyparser=require("body-parser"),
    User      =require("./models/user");

mongoose.connect("mongodb+srv://gogaga:gogaga@cluster0-mmav3.mongodb.net/Blog?retryWrites=true&w=majority",{useNewUrlparser:true,useUnifiedTopology:true});
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));

// app.get("/",function(req,res){
// 	res.render("home");
// })

app.get("/",function(req,res){
	User.find({},function(err,user){
		if(err){console.log(err);}
		else{res.render("home",{user:user});}
	});
});
app.get("/newjourney",function(req,res){
	res.render("new");
})
app.post("/newjourney",function(req,res){
	User.create(req.body.user,function(err,user){
		if(err){console.log(err);}
		else{res.redirect("/");}
	})
});
app.get("/more/:id",function(req,res){
	User.findById(req.params.id,function(err,user){
		if(err){console.log(err);}
		else{
			res.render("show",{user:user});
		}
	});
});




app.listen(process.env.PORT,process.env.IP,function(){
	console.log("server started");
})