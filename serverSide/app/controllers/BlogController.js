"use strict"
const catchAsyncFunction = require('../middlewares/catchAsyncFun');
const BlogCategory = require('../model/BlogCategory')
const Blog = require('../model/Blog')
const UserModel = require('../model/users')
const BlogCats = require('../model/BlogCats')
const s3 = require('../utils/s3Service')



exports.addBlogCategory = catchAsyncFunction(async(req,res)=>{
    try {
        const blogcategory = await BlogCategory.create({
            title:req.body.title,
        });    
        res.json({
            success: true,
            message: "Blog Category added successfully",
            data: blogcategory
        });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
})


exports.getBlogCategories = catchAsyncFunction(async(req, res) => {
    try {
        const user = await BlogCategory.find();
        res.json({
            success: true,
            data: user,
            message: "Blog Categories are following",
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }



})


exports.deleteBlogCategories = catchAsyncFunction(async(req, res) => {
    await BlogCategory.findByIdAndRemove(req.body.id).then(data => {
        if (!data) {
            res.status(404).send({

                message: `Blog Category not found.`
            });
        } else {
            res.send({
                message: "Blog Category deleted successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });


})



exports.addBlog = catchAsyncFunction(async(req,res)=>{
  
    try {
        let imagePaths = [];
  
        if (Array.isArray(req.files.image) && req.files.image.length > 0) {
          for (let image of req.files.image) {
            try {
              const s3Url = await s3.uploadToS3(image, 'images'); 
              imagePaths.push(s3Url);
            } catch (error) {
              console.error('Error uploading image to S3:', error);
              return res.status(500).json({
                success: false,
                message: 'Error uploading image to S3',
              });
            }
          }
        }
        var time = new Date().getTime();
        const blog = await Blog.create({
            title:req.body.title,
            description:req.body.description,
            user_id:req.body.user_id,
            image:imagePaths,
            date:time
        });  
        
        var category=req.body.category;
        for (let cat of category) {
            const blogcats = await BlogCats.create({
                cat_id:cat,
                blog_id:blog._id,
            });
        }
        
        res.json({
            success: true,
            message: "Blog  added successfully",
            data: blog
        });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
})




exports.getBlog = catchAsyncFunction(async (req, res) => {
    try {
        var blogs;
        if(req.body.id){
            const q1 = await Blog.find({_id:req.body.id}); // Replace with your data retrieval logic
            blogs=q1
        }
        else if (req.body.user_id){
            const q2 = await Blog.find({user_id:req.body.user_id}); // Replace with your data retrieval logic
            blogs=q2
        }
        else if(req.body.cat_id){
            const blog_ids = await BlogCats.find({cat_id:req.body.cat_id});
            var ids=[];
            blog_ids.forEach(element => {
                  ids.push(element.blog_id);
            });
            const q3 = await Blog.find({_id:ids}); // Replace with your data retrieval logic
            blogs=q3
        }
        else if(req.body.title){
            const searchTerm = req.body.title; // Assuming req.body.title contains the user's search term
            const regex = new RegExp(`.*${searchTerm}.*`, 'i'); // Creating a case-insensitive regular expression
            const q4 = await Blog.find({ "title": regex });
        blogs=q4
        }
        else{
            const q5 = await Blog.find(); // Replace with your data retrieval logic
            blogs=q5
    }
      // Define a function to retrieve category names for a given blog entry
      const getCategoryNames = async (categoryIds) => {
        const categoryNames = [];
        for (const categoryId of categoryIds) { 
          const category = await BlogCategory.findById(categoryId.cat_id); // Replace with your category retrieval logic
          if (category) {
            categoryNames.push(category.title);
          }
        }
        return categoryNames;
      };
  
      // Define a function to retrieve the user's full name for a given blog entry
      const getUserName = async (userId) => {
        const user = await UserModel.findById(userId); // Replace with your user retrieval logic
        if (user) {
          return `${user.firstName} ${user.lastName}`;
        }
        return 'Unknown';
      };
  
      // Format the blog data
      const formattedBlogs = [];
      console.log(blogs);
      for (const blog of blogs) {
        const categories = await BlogCats.find({blog_id:blog._id});
        const cats = await getCategoryNames(categories);
        const postedBy = await getUserName(blog.user_id);
        const formattedBlog = {
          _id: blog._id,
          title: blog.title,
          image: blog.image,
          status: blog.status,
          description: blog.description,
          date: blog.date,
          categories: cats,
          posted_by: postedBy,
        };
        formattedBlogs.push(formattedBlog);
      }
  
      // Send the formatted data as a JSON response
      res.json({
        success: true,
        data: formattedBlogs,
        message: "Blogs are following",
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });
  



  exports.deleteBlog = catchAsyncFunction(async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndRemove(req.body.id);

        if (!deletedBlog) {
            return res.status(404).send({
                message: `Blog not found.`
            });
        }

        await BlogCats.deleteMany({ blog_id: req.body.id });

        res.send({
            message: "Blog deleted successfully!"
        });
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        res.status(500).send({
            message: "Internal server error."
        });
    }
});


exports.updateBlog = catchAsyncFunction(async(req,res)=>{
    try {
        let imagePaths = [];
        if (Array.isArray(req.files.image) && req.files.image.length > 0) {
            for (let image of req.files.image) {
                try {
                    const s3Url = await s3.uploadToS3(image, 'images'); // Upload the updated image to S3
                    imagePaths.push(s3Url);
                } catch (error) {
                    console.error('Error uploading image to S3:', error);
                    return res.status(500).json({
                        success: false,
                        message: 'Error uploading image to S3',
                    });
                }
            }
        }
        var time = new Date().getTime();
        var filter = { _id: req.body.id };
        const updateDoc = {
            $set: {
                title:req.body.title,
                description:req.body.description,
                user_id:req.body.user_id,
                image:imagePaths,
                date:time
            },
        };
        const options = { upsert: true };
    
        const result = await Blog.updateOne(filter, updateDoc, options);
        await BlogCats.deleteMany({ blog_id: req.body.id });
        var category=req.body.category;
        for (let cat of category) {
            const blogcats = await BlogCats.create({
                cat_id:cat,
                blog_id:req.body.id,
            });
        }
        
        res.json({
            success: true,
            message: "Blog  updated successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
})



