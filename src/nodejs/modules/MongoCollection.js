var mongoUrl = process.env.SCRUM_MONGO;
var MongoClient = require('mongodb').MongoClient;
MongoCollection = function(collectionName) {
	var that = this;
	this.collectionName = collectionName;
	MongoClient.connect(mongoUrl, function(err, db){
		if(err) { 
			return console.dir(err); 
		}
		that.db = db;
	})
}

MongoCollection.prototype.getCollection= function(callback) {
	this.db.collection(this.collectionName, function(error, thisCollection) {
		if(error) {
			callback(error);
		}
		else {
			callback(null, thisCollection);
		}
	});
};

MongoCollection.prototype.find = function(user, callback) {
	this.getCollection(function(error, thisCollection) {
		if(error) {
			callback(error)
		}
		else {
			thisCollection.find(user).toArray(function(error, results) {
				if(error) {
					callback(error);
				}
				else {
					callback(null, results);
				}
			});
		}
	});
};

MongoCollection.prototype.insert = function(user, callback) {
	this.getCollection(function(error, thisCollection) {
		if(error){
			callback(error);
		}
		else {

			thisCollection.insert(user, function(error, results) {
				callback(error, results, user);
			});
		}
	});	
};

MongoCollection.prototype.removeOne = function(user, callback) {
	this.getCollection(function(error, thisCollection) {
		if(error){
			callback(error);
		}
		else {
			thisCollection.deleteOne(user, {}, function(error, results) {
				callback(error, results);
			});
		}
	});	
}

MongoCollection.prototype.updateOne = function(user, updatedData, callback) {
	this.getCollection(function(error, thisCollection) {
		if(error){
			callback(error);
		}
		else {

			thisCollection.updateOne(user, updatedData, {upsert:false}, function(error, results) {
				callback(error, results);
			});
		}
	});	
};

MongoCollection.prototype.aggregate = function(options, callback) {
	this.getCollection(function(error, thisCollection) {
		if(error){
			callback(error);
		}
		else {
			thisCollection.aggregate(options, function(error, results) {
				callback(error, results);
			});
		}
	});
}

module.exports = MongoCollection;