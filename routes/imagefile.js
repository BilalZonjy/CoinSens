
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
var express = require('express');
var router = express.Router();
var multer = require('multer');
var mongoose = require('mongoose');

//path and originalname are the fields stored in mongoDB
var imageSchema = mongoose.Schema({
    path: {
        type: String,
        required: true,
        trim: true
    },
    originalname: {
        type: String,
        required: true
    }

});


var Image = module.exports = mongoose.model('files', imageSchema);

router.getImages = function (callback, limit) {

    Image.find(callback).limit(limit);
}


router.getImageById = function (id, callback) {

    Image.findById(id, callback);

}

router.addImage = function (image, callback) {
    Image.create(image, callback);
}


// To get more info about 'multer'.. you can go through https://www.npmjs.com/package/multer..
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({
    storage: storage
});

router.get('/', function (req, res, next) {
    res.render('index.ejs');
});

router.post('/', upload.any(), function (req, res, next) {

    res.send(req.files);

    /*req.files has the information regarding the file you are uploading...
    from the total information, i am just using the path and the imageName to store in the mongo collection(table)
    */
    var path = req.files[0].path;
    var imageName = req.files[0].originalname;

    var imagepath = {};
    imagepath['path'] = path;
    imagepath['originalname'] = imageName;

    //imagepath contains two objects, path and the imageName

    //we are passing two objects in the addImage method.. which is defined above..
    router.addImage(imagepath, function (err) {

    });

});

module.exports = router;