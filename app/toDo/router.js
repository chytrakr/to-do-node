const config = require('../config/routes.js');
const router = config.express.Router();
const collection = require('./model.js');

// @route GET api/v1/to-do/list
// @desc get users list with pagination
// @access Public
router.get('/list', function (req, res) {

	// Create Options
	let options = { sort: '-createdAt' };
	options.page = (req.query.page)? Number(req.query.page): 1;
	options.limit = (req.query.limit)? Number(req.query.limit): 200;

	// Create query params
	let query = {};
	if(req.query.id) {
    	query["_id"] = req.query.id;
    } else {
	  	res.status(200).send({docs: []});
	  	return false;
    }

	collection.paginate(query, options, function(err, result) {
	    if (err) return res.status(500).send({message: "Something went wrong, please try after sometime"});
	    res.status(200).send(result);
	});
});

// @route CREATE api/v1/to-do/add
// @desc add to-do
// @access Public
router.post('/add', function(req, res) {

  if(!req.query.id) {
	  collection.create({toDos: [{toDo: req.body.text, done: false, tag: req.body.tag, tagColor: req.body.tagColor}]}, function (err, toDo) {
	    if (!err) {
	      return res.status(200).json({error: false, data: toDo, message: 'success'})
	    } else {
  	        return res.status(500).send({error: true, message: 'Error adding to-do'})
	    }
	  });
	} else {
		let updateData = {
	        $push: {
	          	"toDos": {toDo: req.body.text, done: false, tag: req.body.tag, tagColor: req.body.tagColor}
	        }
	    };
		updateToDo({_id: req.query.id}, updateData).then(toDo => {
	        return res.status(200).json({error: false, data: toDo, message: 'success'})
		}, err => {
  	        return res.status(500).send({error: true, message: 'Error adding to-do'})
		})
	}
});

// @route UPDATE api/v1/to-do/done
// @desc update toDo status
// @access Public
router.put('/done/:userId/:toDoId', function(req, res) {

	let updateData = {
        $set: {
          "toDos.$.done": req.body.done
        }
    };
	updateToDo({_id: req.params.userId, "toDos._id": req.params.toDoId}, updateData).then((toDo) => {
	    return res.status(200).json({error: false, message: 'Updated successfully'})
	}, err => {
	    return res.status(500).send({error: true, message: err})
	})
});

// @route UPDATE api/v1/to-do/delete
// @desc delete toDo
// @access Public
router.put('/delete/:userId/:toDoId', function(req, res) {
	let updateData = { "$pull": { "toDos": { "_id": req.params.toDoId } } }
	updateToDo({_id: req.params.userId, "toDos._id": req.params.toDoId}, updateData).then((toDo) => {
	    return res.status(200).json({error: false, message: 'Updated successfully'})
	}, err => {
	    return res.status(500).send({error: true, message: err})
	})
});

function updateToDo(query, updateData) {
  	return new Promise(function(resolve, reject) {
      	collection.findOneAndUpdate(query, updateData, {new: true},
        	function (err, resp) {
          		if (err) return reject({error: 1, message: "There was a problem while updating data"});
          		return resolve(resp);
        	}
      	);
    })
}

function getToDos(query) {
  	return new Promise(function(resolve, reject) {
      	collection.find(query,
        	function (err, resp) {
          		if (err) return reject({error: 1, message: "There was a problem while updating data"});
          		return resolve(resp);
        	}
      	);
    })
}


module.exports = router
