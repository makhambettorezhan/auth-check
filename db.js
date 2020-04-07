const fs = require('fs');

const fetchData = () => {
	try {
		var string = fs.readFileSync('db.json');
		return JSON.parse(string);
	} catch(e) {
		return [];
	}
}

const saveData = (data) => {
	fs.writeFileSync('db.json', JSON.stringify(data));
} 
const addUser = (user) => {
	var list = fetchData();
	var duplList = list.filter(item => item.login === user.login);

	if(duplList.length === 0) {
		list.push(user);
		saveData(list);
		return true;
	}

	return false; 
};

module.exports.addUser = addUser;