const PostsModal = require('../models/posts');

function createPost(req, res) {
    const title = req.body.title;
    const content = req.body.content;
    const author = req.body.author;

    const post = new PostsModal({
        title, content, author
    });

    post.save().then((result) => {

        return res.json(result);

    }).catch((error) => {

        console.log(error);
        return res.status(500).send(error);

    })
};

function getPost(req, res) {
    const id = req.params.id;

    PostsModal.findOne({ _id: id })
        .populate('author')
        .exec((error, result) => {
            if (error) {
                return res.status(500).send();
            }

            return res.json(result);
        });
};


function deletePost(req, res) {
    const id = req.params.id;

    PostsModal.deleteOne({ _id: id }, (error, result) => {
        if (error) {
            return res.sendStatus(500);
        }

        return res.send('Post deleted');
    });
};

function updatePost(req, res) {
    const id = req.params.id;

    PostsModal.updateOne({ _id: id }, req.body, (error, result) => {
        if (error) {
            return res.status(500).send();
        }

        return res.json(result);

    });
};

function getAllPosts(req, res) {
    PostsModal.find({})
        .populate('author')
        .exec((error, result) => {
            if (error) {
                return res.status(500).send();
            }

            return res.json(result);
        });
};

module.exports = {
    createPost,
    getPost,
    deletePost,
    updatePost,
    getAllPosts
}