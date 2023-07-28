import {BricklinkRequest, RequestBody, RequestParams} from '../request';

/**
 * Represents an inventory object
 */
export class Inventory {
  /**
   * Create a new instance of a store inventory
   * @param {object} [data] API response data.
   * @param {number} [data.inventory_id] The inventory id. i.e. - 50592684
   * @param {object} [data.item] The inventory item.
   * @param {string} [data.item.no] The inventory item id. i.e. - bel004
   * @param {string} [data.item.name] The inventory item name. i.e. - Belville Accessories - Complete Sprue - Perfume Bottles (same as 6932)
   * @param {string} [data.item.type] The inventory item type. i.e. - PART
   * @param {string} [data.item.categoryID] The inventory item type. i.e. - PART
   * @param {number} [data.color_id] The inventory item color id. i.e. - 5
   * @param {number} [data.quantity] The number of items included in this inventory. i.e. - 10
   * @param {string} [data.new_or_used] Whether the inventory item is new or used. i.e. - U or N
   * @param {string} [data.completeness] Whether the inventory set is complete or incomplete. i.e. - C, B or S
   * @param {string} [data.unit_price]
   * @param {number} [data.bind_id]
   * @param {string} [data.description]
   * @param {string} [data.remarks]
   * @param {number} [data.bulk]
   * @param {boolean} [data.is_retain]
   * @param {boolean} [data.is_stock_room] Whether the inventory item appears only in the owner's inventory. ie. - true
   * @param {string} [data.stock_room_id] The inventory stockroom identifier. i.e. - A, B or C
   * @param {string} [data.date_created]
   * @param {number} [data.sale_rate]
   * @param {string} [data.my_cost]
   * @param {number} [data.tier_quantity1]
   * @param {string} [data.tier_price1]
   * @param {number} [data.tier_quantity2]
   * @param {string} [data.tier_price2]
   * @param {number} [data.tier_quantity3]
   * @param {string} [data.tier_price3]
   */
  constructor(data) {
    data = data || {};

    /** @type {number} */
    this.inventory_id = data.inventory_id || undefined;
    /** @type {object} */
    this.item = data.item || {no: undefined, name: undefined, type: undefined, categoryID: undefined};
    /** @type {number} */
    this.color_id = data.color_id || undefined
    /** @type {number} */
    this.quantity = data.quantity || undefined
    /** @type {string} */
    this.new_or_used = data.new_or_used || undefined
    /** @type {string} */
    this.completeness = data.completeness || undefined
    /** @type {string} */
    this.unit_price = data.unit_price || undefined
    /** @type {number} */
    this.bind_id = data.bind_id || undefined
    /** @type {string} */
    this.description = data.description || undefined
    /** @type {string} */
    this.remarks = data.remarks || undefined
    /** @type {number} */
    this.bulk = data.bulk || undefined
    /** @type {boolean} */
    this.is_retain = data.is_retain || undefined
    /** @type {boolean} */
    this.is_stock_room = data.is_stock_room || undefined
    /** @type {string} */
    this.stock_room_id = data.stock_room_id || undefined
    /** @type {Date} */
    this.date_created = new Date(data.date_created) || undefined
    /** @type {number} */
    this.sale_rate = data.sale_rate || undefined
    /** @type {string} */
    this.my_cost = data.my_cost || undefined
    /** @type {number} */
    this.tier_quantity1 = data.tier_quantity1 || undefined
    /** @type {string} */
    this.tier_price1 = data.tier_price1 || undefined
    /** @type {number} */
    this.tier_quantity2 = data.tier_quantity2 || undefined
    /** @type {string} */
    this.tier_price2 = data.tier_price2 || undefined
    /** @type {number} */
    this.tier_quantity3 = data.tier_quantity3 || undefined
    /** @type {string} */
    this.tier_price3 = data.tier_price3 || undefined
  }

  /**
   * Method to get specific color details
   *
   * Usage:
   *
   * ```
   * var req = Color.get(10);
   * client.send(req).then(color => console.log(color));
   * ```
   *
   * @param {number} inventoryId An inventory id.
   * @return {BricklinkRequest} A request that resolves to an {@link Inventory} instance.
   */
  static get(inventoryId) {
    let method = BricklinkRequest.GET;
    let uri = `/inventories/${inventoryId}`;

    return new BricklinkRequest(method, uri, null, null,(data) => new Inventory(data));
  }

  /**
   * Get a list of all colors
   *
   * Usage:
   *
   * ```
   * var req = Color.all();
   * client.send(req).then(colors => console.log(colors));
   * ```
   *
   * @return {BricklinkRequest} A request that resolves to an array of {@link Color}.
   */
  static all() {
    let method = BricklinkRequest.GET;
    let uri = `/inventories`;

    return new BricklinkRequest(method, uri, null,  null,(data) =>
      data.map((d) => new Inventory(d)),
    );
  }

  /**
   * Update store inventory
   *
   * @returns {BricklinkRequest}
   */
  update() {
    let method = BricklinkRequest.PUT;
    let uri = `/inventories/${this.inventory_id}`;
    let body = new RequestBody();

    body['quantity'] = 0
    body['unit_price'] = this.quantity
    body['description'] = this.description
    body['remarks'] = this.remarks
    body['bulk'] = this.bulk
    body['is_retain'] = this.is_retain
    body['is_stock_room'] = this.is_stock_room
    if (this.is_stock_room) {
      body['stock_room_id'] = this.stock_room_id
    }
    body['my_cost'] = this.my_cost
    body['sale_rate'] = this.sale_rate
    if (
      this.tier_quantity1 && this.tier_quantity2 && this.tier_quantity3 &&
      this.tier_price1 && this.tier_price2 && this.tier_price3
    ) {
      body['tier_quantity1'] = this.tier_quantity1
      body['tier_price1'] = this.tier_price1
      body['tier_quantity2'] = this.tier_quantity2
      body['tier_price2'] = this.tier_price2
      body['tier_quantity3'] = this.tier_quantity3
      body['tier_price3'] = this.tier_price3
    }

    return new BricklinkRequest(method, uri, null, body, (data) => new Inventory(data));
  }
}
