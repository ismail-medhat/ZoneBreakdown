const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "zonebreakdowndb",
});

//--------------- Start Agent API ---------------------------

app.get("/agents", (req, res) => {
  const sql = "SELECT * FROM agent";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error when i get agents data");
    return res.json(data);
  });
});

app.get("/agent/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM agent WHERE ID=${id}`;
  db.query(sql, (err, data) => {
    if (err) return res.json("Error when i get agent data");
    return res.json(data);
  });
});

app.delete("/agent/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM agent WHERE ID=${id}`;
  db.query(sql, (err, data) => {
    if (err) return res.json("Error when i get agent data");
    return res.json(data);
  });
});

app.post("/create-agent", (req, res) => {
  const sql =
    "INSERT INTO agent (`name`,`email`,`password`,`phone`,`max_zone`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.phone,
    req.body.maxZone,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json("Error when i create agent data");
    return res.json(data);
  });
});

app.put("/update-agent/:id", (req, res) => {
  const sql =
    "UPDATE agent SET name=?, email=?, password=? ,phone=? ,max_zone=? WHERE ID=?";
  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.phone,
    req.body.maxZone,
  ];
  const id = req.params.id;
  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.json("Error when i update agent data");
    return res.json(data);
  });
});

//--------------- End Agent API ---------------------------
//-----------------------------------------------------------
//--------------- Start Counties API --------------------------

app.get("/counties", (req, res) => {
  const sql =
    "SELECT counties.* , zone.name as zoneName  FROM counties JOIN zone ON counties.zone_id=zone.ID";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error when i get county data");
    return res.json(data);
  });
});

app.get("/county/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM counties WHERE ID=${id}`;
  db.query(sql, (err, data) => {
    if (err) return res.json("Error when i get county data");
    return res.json(data);
  });
});

app.delete("/county/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM counties WHERE ID=${id}`;
  db.query(sql, (err, data) => {
    if (err) return res.json("Error when i get county data");
    return res.json(data);
  });
});

app.post("/create-county", (req, res) => {
  const sql =
    "INSERT INTO counties (`name`,`zipcode`,`lat`,`lng`,`zone_id`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.zipcode,
    req.body.lat,
    req.body.lng,
    req.body.zone_id,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json("Error when i create county data");
    return res.json(data);
  });
});

app.put("/update-county/:id", (req, res) => {
  const sql =
    "UPDATE counties SET name=?, zipcode=?,lat=?,lng=?, zone_id=?  WHERE ID=?";
  const values = [
    req.body.name,
    req.body.zipcode,
    req.body.lat,
    req.body.lng,
    req.body.zone_id,
  ];
  const id = req.params.id;
  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.json("Error when i update county data");
    return res.json(data);
  });
});
//--------------- End Counties API --------------------------
//-----------------------------------------------------------
//--------------- Start Zone API --------------------------
app.get("/zones", (req, res) => {
  const sql = "SELECT * FROM zone";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error when i get zone data");
    return res.json(data);
  });
});

app.get("/zone/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM zone WHERE ID=${id}`;
  db.query(sql, (err, data) => {
    if (err) return res.json("Error when i get zone data");
    return res.json(data);
  });
});

app.delete("/zone/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM zone WHERE ID=${id}`;
  db.query(sql, (err, data) => {
    if (err) return res.json("Error when i get zone data");
    return res.json(data);
  });
});

app.post("/create-zone", (req, res) => {
  const sql = "INSERT INTO zone (`name`,`max_agent`) VALUES (?)";
  const values = [req.body.name, req.body.maxAgent];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json("Error when i create zone data");
    return res.json(data);
  });
});

app.put("/update-zone/:id", (req, res) => {
  const sql = "UPDATE zone SET name=?, max_agent=?  WHERE ID=?";
  const values = [req.body.name, req.body.maxAgent];
  const id = req.params.id;
  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.json("Error when i update zone data");
    return res.json(data);
  });
});
//--------------- End Zone API --------------------------
//-----------------------------------------------------------
//--------------- Start Admin Login API ---------------------
app.get("/admin-login", (req, res) => {
  const email = req.body.email;
  const sql = `SELECT * FROM admin WHERE email=${email}`;
  db.query(sql, (err, data) => {
    if (err) return res.json("Error credential");
    res.json(data);
  });
});
//--------------- End Admin Login API ---------------------
//--------------- Start Agent View API ---------------------
app.get("/counties-zone", (req, res) => {
  const sql = `SELECT zone.* , GROUP_CONCAT(counties.name) AS counties
  FROM zone 
  LEFT JOIN counties ON zone.ID = counties.zone_id
  GROUP BY zone.ID, zone.name`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//--------------- End Agent View API ---------------------

app.listen(8081, () => {
  console.log("listening server....");
});
