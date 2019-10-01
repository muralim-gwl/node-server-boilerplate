import { version } from "../../package.json";
import { Router } from "express";

export default ({ config, db }) => {
  let api = Router();

  api.get("/company", (req, res) => {
    //find id in company table and return the company
    db.query("SELECT * from company", (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows);
				res.json({"companies":response.rows});
      }
    });


  });
  // perhaps expose some API metadata at the root
  api.get("/company/:id", (req, res) => {
    //find id in company table and return the company
    db.query(`SELECT * from company where id=${req.params.id}`, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows);
				res.json({"companies":response.rows});
      }
    });
  });

  api.post("/company", (req, res) => {
    //take company from req and insert into company table
    console.log("body", req.body);
    const {name,address,phonenumber}=req.body;
    db.query(`insert into company values(${new Date().getTime()},'${name}','${address}',${phonenumber})`, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows);
				res.json({"status":"successfull","response":response.rows});
      }
    });
  });

  api.put("/company/:id", (req, res) => {
    console.log("req", req.params);
    console.log("body", req.body);
    //take company id from path and find the id and update
    res.json({ version, status: "live", method: "put" });
  });

  api.delete("/company/:id", (req, res) => {
    console.log("req", req.params);
    //take company id from path and find the id and update flag
    res.json({ version, status: "live", method: "delete" });
  });
  return api;
};
