
import Blog from "../model/blog1.js"




class blogController {
    //get all blogs
    static async  getBlogs(req, res){
        try {
            const blogs = await Blog.find()
          res.status(200).json({
            data: blogs

          })

        }
            catch(error){
                console.log(error);
             res.status(500).json({
                message: "Server error "
             })
            }
        }

        static async getBlog(req, res)
        {
            try{
            const { id } = req.params;
  
                    const blog = await Blog.findOne({_id: id})

                    if(!blog) {
                        return res.status(404).json({
                            message:`Blog with id: ${id} not found`
                        })
                    }
                    else{
                        
                        return res.status(200).json({
                              data: blog
                        });
                    }
                }
                catch(error){
                    console.log(error);
                 res.status(500).json({
                    message: "Server error "
                 })
    
    
                  }
        }
        

        static async createBlog(req, res) {
            try {
              const { Articlename, ArticleDescription, author, content } = req.body;
              let image = null;
              
              // Check if there is a file uploaded
              if (req.file) {
                image = {
                  data: req.file.buffer,
                  contentType: req.file.mimetype
                };
              }
          
              const newBlog = await Blog.create({
                Articlename,
                ArticleDescription,
                author,
                content,
                image
              });
          
              res.status(201).json({
                message: "new blog created successfully",
                data: newBlog
              });
            } catch (error) {
              console.log(error);
              res.status(500).json({
                message: "Server error"
              });
            }
          }
          

            static async  updateBlog(req, res) {
                  //console.log(req.params.id)

                  try {
                    //const id = req.params.id
                    const { id } = req.params;
                        
                    const { Articlename, ArticleDescription, content } = req.body
                    const _id = id
                    const updatedblog = await Blog.findByIdAndUpdate(_id, {Articlename, ArticleDescription, content}, {new: true});
                    
                    
                    if(!updatedblog) {
                        return res.status(404).json({
                            message:`Blog with id: ${id} not found`
                        })
                    }
                    else{
                        /*updatedblog.Articlename = Articlename;
                        updatedblog.ArticleDescription = ArticleDescription;
                        updatedblog.content = content;
                        */

                        return res.status(200).json({
                              message: "Blog updated succssfully",
                              data: updatedblog
                        });
                    }

                  }
                  catch (error)
                  {
                    console.log(error);
                    res.status(500).json({
                       message: "Server error "
                    })
                  }

            }

            

            static async deleteblog (req, res) {
                try {
                    const {id} = req.params
                    const _id = id

                    const Blogtodelete = await Blog.findByIdAndDelete (_id)

                    if(!Blogtodelete) {
                        return res.status(404).json({
                            message:`Blog with id: ${id} not found`
                        });
                    }

                    else {
            
                        return res.status(200).json({
                            message: "Blog deleted successfully",
                           
                        });
                    }
                   
                }
                catch (error)
                {
                    console.log(error);
                    res.status(500).json({
                       message: "Server error "
                    })
                    
                }
            }

            static async addComment(req, res) {
              try {
                const { id } = req.params;
                const { text, author1 } = req.body;
            
                const blog = await Blog.findById(id);
            
                if (!blog) {
                  return res.status(404).json({
                    message: `Blog with id: ${id} not found`,
                  });
                }
            
                blog.comments.push({ text, author1 });
                await blog.save();
            
                res.status(200).json({
                  message: "Comment added successfully",
                  data: blog,
                });
              } catch (error) {
                console.log(error);
                res.status(500).json({
                  message: "Server error",
                });
              }
            }
            
        }

      
   


export default blogController
