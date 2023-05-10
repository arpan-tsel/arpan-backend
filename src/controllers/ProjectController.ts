// Project Controller
// function :
//  -uploadProject : upload project file to database
//  -getDataByIdProject : get project data by id
//  -updateDataProject : update project data
//  -getAllProjectsdata : get all project data
//  -getProjectTracking : make table for project tracking
//  -getKertasKerja : Audit menu, get Kertas Kerja
//  -filterSelectionProject : filter Kertas Kerja (select what project we want to import in excel)
//  -getRequestorProject : Audit menu, get what Requestor  and data we want to display in Kertas Kerja


import models from '../models';
import readXlsxFile from 'read-excel-file/node';
import Sequelize from 'sequelize';
import db from '../models';
import { Request, Response } from "express";
import { Cell } from 'read-excel-file/types';
import { Op } from 'sequelize';
import { Query } from 'express-serve-static-core';
import { queryProject } from './Queries';
import { inputDboardTop, inputPieChartDboard, InputLchartDept, inputLChartDboard, inputPieChartDept} from './VisualizationController';

const Project = models.projects;

export const uploadProject =async (req:Request, res:Response) => {
    try {
        if (req.file == undefined){
            return res.status(400).send('Please upload an excel file!');
        }

        let path = 
            "./resources/static/assets/uploads/" + req.file.filename;

        readXlsxFile(path, { sheet: 'List RFS-RFI' }).then((rows) => {
            rows.shift();
            let Projects:any[] = [];

            rows.forEach((row) => {
                let project = [
                    row[1],
                    new Date((Number(row[2]) - (25570-1))*86400*1000),
                    row[3],
                    row[4],
                    row[5],
                    row[6],
                    row[7],
                    row[8],
                    row[9],
                    row[10],
                    row[11],
                    row[12],
                    row[13],
                    row[14],
                    row[15],
                    row[16],
                    row[17],
                    row[18],
                    row[19],
                    row[20],
                    row[21],
                    row[22],
                    row[23],
                    row[24],
                     row[25],
                     row[26],
                     row[27],
                     row[28],
                     row[29],
                     row[30],
                     row[31],
                     row[32],
                     row[33]
                ];
                Projects.push(project);
            });
            db.sequelize.query(queryProject,{
              replacements: {values: Projects},
              type: db.sequelize.QueryTypes.INSERT,
              raw:true
            })
                .then(() => {
                    res.status(200).send({
                        message: 'uploaded the file successfully: ' + req.file?.originalname,
                    });
                    inputDboardTop();
                    inputLChartDboard();
                    inputPieChartDboard();
                    inputPieChartDept();
                    InputLchartDept();
                })
                .catch((error:any) => {
                    console.log(error);
                    res.send({
                        message: error.message
                        
                    });
                });

        });
    } catch(error){
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file?.originalname,
        });
        // res.status(500).send(error);
    }

};

//get project data by id
export const getDataByIdProject = async(req:Request, res:Response) => {
    try{
        const datas = await Project.findOne({
          raw:true,
            where:{
                id_project: req.params.id_project
            }
        })
          Object.keys(datas).forEach((element:any, i:any, arr:any)=>{
            if(datas[element]){datas[element] = datas[element].toString().replace(/_x000D_/g, ' ')}
        })
        res.send(datas)
    }catch(error){
        console.log(error);
    }
    console.log(req.params.id_project)
}

//update project data
export const updateDataProject = async(req:Request, res:Response) => {
    try{
        const datas = await Project.update(req.body,{
            where:{
                id_project: req.params.id_project
            },
        });
        res.status(200).json({msg: "Data Updated"});
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

//get all project data
export const getAllProjectsdata = (req:Request, res:Response) => {
    Project.findAll({raw:true})
      .then((data: any) => {
        data.forEach((datas:any)=>{
          Object.keys(datas).forEach((element:any, i:any, arr:any)=>{
            if(datas[element]){datas[element] = datas[element].toString().replace(/_x000D_/g, ' ')}
          })
        })
        res.send(data);
      })
      .catch((err:any) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving data.",
        });
      });
};

//make table project tracking
export interface TypedRequestQuery<T extends Query> extends Express.Request {
    query: T
  }

  export const getProjectTracking = async(req: TypedRequestQuery<{ lastId: string, limit: string, search_query:string, page: string }>, res: Response) =>{
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
  
    const totalRows = await Project.count({
      where:{
        [Op.or]: [{no_nodin_rfsrfi:{
            [Op.like]: '%'+search+'%'
            }}, {subject_nodin_rfsrfi:{
            [Op.like]: '%'+search+'%'
            }}, {no_nodin_rfcitr:{
            [Op.like]: '%'+search+'%'
            }}, {subject_nodin_rfcitr:{
            [Op.like]: '%'+search+'%'
            }}, {title_dev:{
            [Op.like]: '%'+search+'%'
            }}, {pic_dev:{
            [Op.like]: '%'+search+'%'
            }}, {no_nodin_bo:{
            [Op.like]: '%'+search+'%'
            }}, {status:{
            [Op.like]: '%'+search+'%'
            }}, {detail_status:{
            [Op.like]: '%'+search+'%'
            }}, {type_nodin:{
            [Op.like]: '%'+search+'%'
            }}, {date_nodin_rfsrfi:{
            [Op.like]: '%'+search+'%'
            }}, {date_nodin_rfcitr:{
            [Op.like]: '%'+search+'%'
            }}] 
      }
  }); 
  const totalPage = Math.ceil(totalRows / limit);
  const result = await Project.findAll({
      raw:true,
      where:{
        [Op.or]: [{no_nodin_rfsrfi:{
          [Op.like]: '%'+search+'%'
          }}, {subject_nodin_rfsrfi:{
          [Op.like]: '%'+search+'%'
          }}, {no_nodin_rfcitr:{
          [Op.like]: '%'+search+'%'
          }}, {subject_nodin_rfcitr:{
          [Op.like]: '%'+search+'%'
          }}, {title_dev:{
          [Op.like]: '%'+search+'%'
          }}, {pic_dev:{
          [Op.like]: '%'+search+'%'
          }}, {no_nodin_bo:{
          [Op.like]: '%'+search+'%'
          }}, {status:{
          [Op.like]: '%'+search+'%'
          }}, {detail_status:{
          [Op.like]: '%'+search+'%'
          }}, {type_nodin:{
          [Op.like]: '%'+search+'%'
          }}, {date_nodin_rfsrfi:{
          [Op.like]: '%'+search+'%'
          }}, {date_nodin_rfcitr:{
          [Op.like]: '%'+search+'%'
          }}]
      },
      offset: offset,
      limit: limit,
      order:[
          ['date_nodin_rfsrfi', 'DESC']
      ]
    })
    result.forEach((datas:any) =>{
      Object.keys(datas).forEach((data:any, i:any, arr:any)=>{
        if(datas[data]){datas[data] = datas[data].toString().replace(/_x000D_/g, ' ')}
    })
  })
  
    res.json({
          result: result,
          page: page,
          limit: limit,
          totalRows: totalRows,
          totalPage: totalPage
  });
  }
  
  //audit menu
  export const getKertasKerja = async (req: TypedRequestQuery<{lastId: string, search_requestor:string, search_requestor2:string, search_requestor3:string, month1: string, year1:string, month2:string, year2:string, month3:string, year3:string}>, res: Response) =>{

    const searchRequestor = req.query.search_requestor || "";
    const searchRequestor2 = req.query.search_requestor2 || "-";
    const searchRequestor3 = req.query.search_requestor3 || "-";
  
    const resultRequestor = await Project.findAll({
      raw:true,
      where:{
        [Op.and]:[{
          [Op.or]: [
           {title_dev:{                    
          [Op.like]: '%'+searchRequestor+'%'  
          }},
          {title_dev:{                    
            [Op.like]: '%'+searchRequestor2+'%'  
            }},
          {title_dev:{                    
              [Op.like]: '%'+searchRequestor3+'%'  
            }}
        ]
        },{[Op.or]: [
          [
        Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('date_nodin_rfsrfi')), req.query.month1 || "-"),
        Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date_nodin_rfsrfi')), req.query.year1 || "-")
        ],
        [
          Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('date_nodin_rfsrfi')), req.query.month2 || "-"),
          Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date_nodin_rfsrfi')), req.query.year2 || "-")
          ],
          [
            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('date_nodin_rfsrfi')), req.query.month3 || "-"),
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date_nodin_rfsrfi')), req.query.year3 || "-")
            ]
      ]
        
        
      }]
      },
      order:[
          ['id_project', 'ASC']
      ],
      attributes:['id_project', 'no_nodin_rfsrfi','date_nodin_rfsrfi' , 'subject_nodin_rfsrfi', 'no_nodin_bo', 
      'no_nodin_rfcitr', 'selection']
    })
      resultRequestor.forEach((datas:any)=>{
        Object.keys(datas).forEach((data:any, i:any, arr:any)=>{
          if(datas[data]){datas[data] = datas[data].toString().replace(/_x000D_/g, ' ')}
      })
      })
  
  // console.log(resultRequestor)
  
  res.send(resultRequestor);
  
  }

  //filter kertas kerja
  export const filterSelectionProject = async(req: TypedRequestQuery<{lastId: string, search_requestor:string, search_requestor2:string, search_requestor3:string, month1: string, year1:string, month2:string, year2:string, month3:string, year3:string}>, res: Response) =>{
    const searchRequestor = req.query.search_requestor || "";
    const searchRequestor2 = req.query.search_requestor2 || "-";
    const searchRequestor3 = req.query.search_requestor3 || "-";
  
    const resultFilter = await Project.findAll({
      where:{
        [Op.and]:[{
          [Op.or]: [
           {title_dev:{                    
          [Op.like]: '%'+searchRequestor+'%'  
          }},
          {title_dev:{                    
            [Op.like]: '%'+searchRequestor2+'%'  
            }},
          {title_dev:{                    
              [Op.like]: '%'+searchRequestor3+'%'  
            }}
        ]
        },{[Op.or]: [
          [
        Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('date_nodin_rfsrfi')), req.query.month1 || "-"),
        Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date_nodin_rfsrfi')), req.query.year1 || "-")
        ],
        [
          Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('date_nodin_rfsrfi')), req.query.month2 || "-"),
          Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date_nodin_rfsrfi')), req.query.year2 || "-")
          ],
          [
            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('date_nodin_rfsrfi')), req.query.month3 || "-"),
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date_nodin_rfsrfi')), req.query.year3 || "-")
            ]
      ]  
      },{
        selection:{
          [Op.like]:1
        }
      }
    ]
      },
      order:[
          ['id_project', 'ASC']
      ],
      attributes:['no_nodin_bo','subject_nodin_rfsrfi', 'date_nodin_rfsrfi', 'no_nodin_rfsrfi', 
      'no_nodin_rfcitr']
    });
  
  res.send(resultFilter);
  }

  //audit requestor
  export const getRequestorProject = async (req: TypedRequestQuery<{lastId: string, search_requestor:string}>, res: Response) =>{

    const searchRequestor = req.query.search_requestor || "";
  
    const resultRequestor = await Project.findAll({
      where:{
        [Op.or]: [{no_nodin_rfsrfi:{
          [Op.like]: '%'+searchRequestor+'%'
          }}, {subject_nodin_rfsrfi:{
          [Op.like]: '%'+searchRequestor+'%'
          }}, {no_nodin_rfcitr:{
          [Op.like]: '%'+searchRequestor+'%'
          }}, {subject_nodin_rfcitr:{
          [Op.like]: '%'+searchRequestor+'%'
          }}, {title_dev:{
          [Op.like]: '%'+searchRequestor+'%'
          }}, {pic_dev:{
          [Op.like]: '%'+searchRequestor+'%'
          }}, {no_nodin_bo:{
          [Op.like]: '%'+searchRequestor+'%'
          }}]
      },
      order:[
          ['id_project', 'ASC']
      ],
      attributes:['no_nodin_rfsrfi','date_nodin_rfsrfi' , 'subject_nodin_rfsrfi', 'status', 'detail_status', 
      'no_nodin_rfcitr', 
      'date_nodin_rfcitr',
      'subject_nodin_rfcitr',
      'title_dev',
      'pic_dev', 
      'type_nodin', 
      'no_nodin_bo',
      'start_date_testing',
      'end_date_testing',
      'notes_testing',
      'testcase_amt',
      'dev_effort',
      'project_type', 
      'services', 
      'brand',
      'pic_tester_1', 
      'pic_tester_2',
      'pic_tester_3',
      'pic_tester_4', 
      'pic_tester_5']
    });
  
  res.send(resultRequestor);
  
  }