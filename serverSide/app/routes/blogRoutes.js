'use strict'

const express = require('express')
const router = express.Router()
const { addBlogCategory, getBlogCategories,deleteBlogCategories,addBlog,getBlog,deleteBlog,updateBlog } = require('../controllers/BlogController')
const { isAuthenticatedUser, authenticateToken } = require('../middlewares/authMiddlewares')
const upload = require('../utils/multerConfig')



router.route('/add-blog-category').post(addBlogCategory)
router.route('/get-blog-categories').get(getBlogCategories)
router.route('/delete-blog-category').post(deleteBlogCategories)


router.route('/blogs').post(getBlog)
router.route('/delete-blog').post(deleteBlog)

router.post("/add-blog",upload.fields([{name: "image",maxCount: 5,},]),addBlog);
router.post("/update-blog",upload.fields([{name: "image",maxCount: 5,},]),updateBlog);





module.exports = router;