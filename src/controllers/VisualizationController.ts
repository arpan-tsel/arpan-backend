//visualization controller
//function :
//  -inputPieChartDboard : save data for pie chart dashboard in database
//  -InputLchartDept : save data for line chart visualization in database
//  -inputDboardTop : save rfc, rfs, rfi, itr data in database
//  -inputLChartDboard : save data for line chart dashboard in database
//  -inputPieChartDept : save data for pie chart visualization in database

import models from '../models';
import db from '../models';
import { Op } from 'sequelize';
import { queryDboardTopRFCITR, queryDboardTopRFSRFI, queryLChartDept, queryLchartYearBfrDboard, queryLChartYearNowDboard, queryPieChartDboard, queryPieChartDept } from './Queries'

var promises: any[] = [];

//save data for pie chart dashboard in database
export const inputPieChartDboard = async () => {
    const inputdb = await db.sequelize.query(queryPieChartDboard, {
        replacements: { thnpiechart: '%Y-01-01' },
        type: db.sequelize.QueryTypes.SELECT,
        raw: true
    })
    console.log(inputdb)

    inputdb.forEach(function (index: any) {
        promises.push(models.reqDiv.update({ value: index.counter }, {
            where: { divKey: index.division }
        }))

    });
    Promise.all(promises).then(function () {
        console.log('sukses')
    }, function (err) {
        console.log(err);
    })
}

//line chart visualization
export const InputLchartDept = async () => {
    db.sequelize.query('DELETE FROM linechartdepartments;', {
        type: db.sequelize.QueryTypes.DELETE,
        raw: true
    })

    const inputdb = await db.sequelize.query(queryLChartDept, {
        replacements: { ytdlinedept: '%Y-01-01' },
        type: db.sequelize.QueryTypes.SELECT,
        raw: true
    })
    console.log(inputdb)

    let currentDepartment = ' '
    let monthList = ' '
    let counterList = ' '
    let stringg = ' '
    inputdb.forEach((element: any, index: any, arr: any[]) => {

        if (currentDepartment == element.department) {
            stringg = stringg + ', '
            monthList = monthList + ', '
            counterList = counterList + ', '
        }
        if (currentDepartment == "") {
            currentDepartment = element.department
            stringg = `("${element.division}", "${element.department}", `
        }
        if (currentDepartment != element.department) {
            if (currentDepartment != " ") {
                stringg = stringg + ' '
                try {
                    const update = db.sequelize.query(`INSERT INTO linechartdepartments (division, department, ${monthList}) VALUES ${stringg})`, {
                        type: db.sequelize.QueryTypes.INSERT,
                        raw: true
                    });
                } catch (err) {
                    console.log(err);
                }
                monthList = ' '
            }
            currentDepartment = element.department;
            stringg = '';
            stringg = `("${element.division}", "${element.department}", `
        }
        monthList += element.month
        stringg = stringg + element.counter

        if (index === arr.length - 1) {
            stringg = stringg + ' '
            try {
                const update = db.sequelize.query(`INSERT INTO linechartdepartments (division, department, ${monthList}) VALUES ${stringg})`, {
                    type: db.sequelize.QueryTypes.INSERT,
                    raw: true
                });
            } catch (err) {
                console.log(err);
            }
        }

    })
}


//dashboard rfc rfs rfi itr
export const inputDboardTop = async () => {
    const inputdb = await db.sequelize.query(queryDboardTopRFSRFI, {
        replacements: { ytd: '%Y-01-01' },
        type: db.sequelize.QueryTypes.SELECT,
        raw: true
    })
    console.log(inputdb)

    let stringg = " ";
    inputdb.forEach((element: any, index: any, arr: any[]) => {
        console.log('panjang', arr.length)
        stringg = stringg + `${element.type_nodin}=${element.counter}`
        if (arr.length != index + 1) {
            stringg = stringg + ', '
        } else {
            stringg = stringg + ' '
        }

    });
    console.log(stringg)

    const inputdb2 = await db.sequelize.query(queryDboardTopRFCITR, {
        replacements: { ytd: '%Y-01-01' },
        type: db.sequelize.QueryTypes.SELECT,
        raw: true
    })
    console.log(inputdb2)

    let stringg2 = " ";
    let stringg3 = " ";
    inputdb2.forEach((element: any, index: any, arr: any[]) => {
        stringg2 = `rfc=${arr[0].counter}`
        stringg3 = `itr=${arr[1].counter}`

    });
    console.log("string2 dan string3", stringg2, stringg3)

    try {
        const update = await db.sequelize.query('UPDATE dboardtops SET' + stringg + ',' + stringg2 + ',' + stringg3 + ' ' + 'WHERE ID=1', {
            type: db.sequelize.QueryTypes.UPDATE,
            raw: true
        });
    } catch (err) {
        console.log(err)
    }
}

//line chart dashboard
export const inputLChartDboard = async () => {
    const inputdbCurrYear = await db.sequelize.query(queryLChartYearNowDboard, {
        replacements: { ytdnow: '%Y-01-01' },
        type: db.sequelize.QueryTypes.SELECT,
        raw: true
    })
    console.log(inputdbCurrYear);

    let stringg = " ";
    let stringyear = " ";
    // let stringyearerr = " ";
    inputdbCurrYear.forEach((element: any, index: any, arr: any[]) => {
        stringyear = ` year='${arr[0].year}'`
        // stringyearerr = `year='-'`
        stringg = stringg + `${element.month}=${element.counter}`
        if (arr.length != index + 1) {
            stringg = stringg + ', '
        } else {
            stringg = stringg + ' '
        }
    })

    try {
        console.log('string year', stringyear)
        const updateCurrYear = await db.sequelize.query('UPDATE rfcitrs SET' + stringyear + ',' + stringg + 'WHERE ID=1', {
            type: db.sequelize.QueryTypes.UPDATE,
            raw: true
        });
        console.log(updateCurrYear);
    } catch (err) {
        // console.log(err)
        let stringyearerr = ` year='-'`;
        const updateCurrYear = await db.sequelize.query('UPDATE rfcitrs SET' + stringyearerr + ',' + 'January=0, February=0, March=0, April=0, June=0, May=0, July=0, August=0, September=0, October=0, November=0, December=0 WHERE ID=1', {
            type: db.sequelize.QueryTypes.UPDATE,
            raw: true
        }
        );

    }

    const inputdbLastYear = await db.sequelize.query(queryLchartYearBfrDboard, {
        type: db.sequelize.QueryTypes.SELECT,
        raw: true
    })
    console.log("1 thn sebelumnya", inputdbLastYear);

    let stLastYear = " ";
    let stringlastyear = " ";
    inputdbLastYear.forEach((element: any, index: any, arr: any[]) => {
        stringlastyear = ` year='${arr[0].year}'`
        stLastYear = stLastYear + `${element.month}=${element.counter}`
        if (arr.length != index + 1) {
            stLastYear = stLastYear + ', '
        } else {
            stLastYear = stLastYear + ' '
        }
    });

    try {
        const updateLastYear = await db.sequelize.query('UPDATE rfcitrs SET' + stringlastyear + ',' + stLastYear + 'WHERE ID=2', {
            type: db.sequelize.QueryTypes.UPDATE,
            raw: true
        });
        console.log(updateLastYear);
    } catch (err) {
        console.log(err)
        db.sequelize.query('UPDATE rfcitrs SET January=0, February=0, March=0, April=0, June=0, May=0, July=0, August=0, September=0, October=0, November=0, December=0 WHERE ID=2', {
            type: db.sequelize.QueryTypes.UPDATE,
            raw: true
        }
        );
    }

}

//pie chart dept
export const inputPieChartDept = async () => {
    var prepaid: any[] = [];
    const inputdb = await db.sequelize.query(queryPieChartDept, {
        replacements: { ytddept: '%Y-01-01' },
        type: db.sequelize.QueryTypes.SELECT,
        raw: true
    })
    console.log(inputdb)

    await models.deptPieChart.update({ counter: null }, {
        where: {
            counter: {
                [Op.ne]: null
            }
        }
    })

    await models.deptPieChart.bulkCreate(inputdb, {
        updateOnDuplicate: [
            'division', 'department', 'counter'
        ]
    })
        .then(() => {
            console.log('sukses input dept')
        })
        .catch((error: any) => {
            console.log(error);
        });


    // var prepaid: any[] = [];
    // const inputdb = await db.sequelize.query(queryPieChartDept, {
    //     replacements: {ytddept:  '%Y-01-01'},
    //     type: db.sequelize.QueryTypes.SELECT,
    //     raw:true
    // })
    // console.log(inputdb)

    // await models.deptPieChart.update({counter: 0},{
    //     where:{
    //         counter:{
    //             [Op.ne]:null
    //         }
    //     }
    // })

    // await models.deptPieChart.bulkCreate(inputdb,{updateOnDuplicate: [
    //     'division', 'department', 'counter'
    // ]})
    // .then(() => {
    //     console.log('sukses input dept')
    // })
    // .catch((error:any) => {
    //     console.log(error);
    // });

}


