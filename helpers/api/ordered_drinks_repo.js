const fs = require('fs');

// orders in JSON file for simplicity, store in a db for production applications
let orders = require('../data/ordered_orders.json');

export const ordersRepo = {
    getAll: () => orders,
    getById: id => orders.find(x => x.id.toString() === id.toString()),
    find: x => orders.find(x),
    create,
    update,
    delete: _delete
};

function create(order) {
    // generate new order id
    order.id = orders.length ? Math.max(...orders.map(x => x.id)) + 1 : 1;

    // set date created and updated
    order.dateCreated = new Date().toISOString();
    order.dateUpdated = new Date().toISOString();

    // add and save order
    orders.push(order);
    saveData();
}

function update(id, params) {
    const order = orders.find(x => x.id.toString() === id.toString());

    // set date updated
    order.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(order, params);
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
    // filter out deleted order and save
    orders = orders.filter(x => x.id.toString() !== id.toString());
    saveData();
    
}

// private helper functions

function saveData() {
    fs.writeFileSync('data/orders.json', JSON.stringify(orders, null, 4))
}