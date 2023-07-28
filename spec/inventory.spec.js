import test from 'ava';
import {Client} from '../src/';
import {config} from './test.config';
import {Inventory} from '../src/store/inventory';

let BL;
test.before(() => {
  BL = new Client(config);
});

/** @param {Inventory} inventory */
let inventory;

test.serial('Can get inventory items', (t) => {
  return BL.getInventories().then((inventories) => {
    t.true(inventories.length > 0, 'Got at least one inventory item')
    t.true(inventories[0] instanceof Inventory, 'The first inventory item is of the correct type');

    inventory = inventories[0]
  });
});

test.serial('Can get single inventory item', (t) => {
  return BL.getInventory(inventory.inventory_id).then((singleInventory) => {
    t.true(singleInventory instanceof Inventory, 'The inventory item is of the correct type')
    t.is(singleInventory.inventory_id, inventory.inventory_id)
  })
})

test.serial('Update inventory item', (t) => {
  return BL.send(inventory.update())
})
