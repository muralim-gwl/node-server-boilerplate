import { version } from "../../package.json";
import { Router } from "express";

export default ({ config, db }) => {
  let api = Router();

  api.get("/task", (req, res) => {
    //find id in task table and return the task
    db.query("SELECT * from tasks", (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows);
        res.json({ tasks: response.rows });
      }
    });
  });
  // perhaps expose some API metadata at the root
  // api.get("/task/:id", (req, res) => {
  //   //find id in task table and return the task
  //   db.query(`SELECT * from task where id=${req.params.id}`, (err, response) => {
  //     if (err) {
  //       console.log(err.stack);
  //     } else {
  //       console.log(response.rows);
  // 			res.json({"companies":response.rows});
  //     }
  //   });
  // });

  api.post("/task", (req, res) => {
    //take task from req and insert into task table
    console.log("body", req.body);
    const { name } = req.body;
    const uuidv1 = require("uuid/v1");
    const id = uuidv1();
    const createdBy = "200";
    const createTime = new Date().toJSON();
    db.query(
      `insert into tasks values('${id}','${name}',false,'${createdBy}','${createTime}')`,
      (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log(response.rows);
          res.json({ status: "successfull"});
        }
      }
    );
  });

  api.put("/task/:id", (req, res) => {
    console.log("req", req.params);
    console.log("body", req.body);
    console.log("body", req.body);
    const { id } = req.params;
    const { status } = req.body;
    const updatedBy = "200";
    const updateTime = new Date().toJSON();
    db.query(
      `UPDATE tasks
	SET status=true,"updatedBy"='${updatedBy}', "updatedTime"='${updateTime}'
	WHERE id='${id}'`,
      (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log(response.rows);
          res.json({ status: "successfull" });
        }
      }
    );
  });

  // api.delete("/task/:id", (req, res) => {
  //   console.log("req", req.params);
  //   console.log("body", req.body);
  //   console.log("body", req.body);
  //   const {id}=req.params
  //   const {status}=req.body;
  //   const updatedBy="200";
  //   const updateTime=new Date().toJSON();
  //   db.query(`update tasks set status=${status} updatedBy=${updatedBy} updateTime=${updateTime} where id=${id}`, (err, response) => {
  //     if (err) {
  //       console.log(err.stack);
  //     } else {
  //       console.log(response.rows);
  //       res.json({"status":"successfull","response":response.rows});
  //     }
  //   });
  // });
  return api;
};
