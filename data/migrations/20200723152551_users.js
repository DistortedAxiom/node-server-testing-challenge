exports.up = function (knex) {
    return knex.schema.createTable("users", tbl => {
      tbl.increments('id');

      tbl.string("username", 255).notNullable();
      tbl.string("password", 60).notNullable()
    });
  };

  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("users");
  };
