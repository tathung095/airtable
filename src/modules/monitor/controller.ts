
import * as path from "path";
import { Tree, print } from '../../model/class';
import { setTimeout } from "timers";

const fs = require("fs");
require("dotenv").config();

export async function question3a(req: any, response: any) {
    const mapperModels = {}, mapperModelModel = {};
    const global = req.app.get('global');
    let logPath = path.join(__dirname, "../../..", `logs/airtable.log`);
    fs.writeFile(logPath, '', 'utf8', (err) => { })
    try {
        const { modelsData, modelModelData } = global;
        modelsData.forEach(element => {
            mapperModels[element.id] = element.get('number');
        });
        modelModelData.forEach(element => {
            mapperModelModel[element.id] = element.fields;
        });
        //Init tree 
        const tree = new Tree(-1, 'Hierarchy view');// key ; value

        //TODO find a root tree
        modelsData?.forEach((element: any) => {
            if (!element?.get('parents')) {
                tree.insert(-1, element.id, element?.get('number'));
            }
            tree.insertMany(element.id, element?.get('children'), mapperModelModel, mapperModels);
        });
        print(tree.root, '', true);
        setTimeout(() => {
            response.download(logPath);
        }, 500)//TODO: Explain after the next round of interview 
    } catch (err) {
        console.log(err);
        response.send({ err });
    }
}
export async function question3b(req: any, response: any) {
    const mapperModels = {}, mapperModelModel = {}, drawingData = {};
    const global = req.app.get('global');
    let logPath = path.join(__dirname, "../../..", `logs/airtable.log`);
    fs.writeFile(logPath, '', 'utf8', (err) => { })
    try {
        const { modelsData, modelModelData, drawingData } = global;
        modelsData.forEach(element => {
            mapperModels[element.id] = element.get('number');
        });
        drawingData.forEach(element => {
            mapperModels[element.id] = element.get('number');
        });
        modelModelData.forEach(element => {
            mapperModelModel[element.id] = element.fields;
        });
        //Init tree 
        const tree = new Tree(-1, 'Drawings view and drawing output ');// key ; value
        drawingData.forEach((elementDraw, index) => {
            tree.insert(-1, elementDraw.get('name'), elementDraw.get('name'));
            let totalNumber = [], totalParent = [];
            elementDraw.get('model_model').forEach(element => {//row 1
                totalNumber.push(...mapperModelModel[element].number);
                totalParent.push(...mapperModelModel[element].parent_number);
                //find index max in each number row
            });
            // totalNumber = [...new Set(totalNumber)];
            totalParent = [...new Set(totalParent)];
            //push parent first
            totalParent.forEach(item => {
                tree.insert(elementDraw.get('name'), item, mapperModels[item]);
            })
            //TODO 
        });

        print(tree.root, '', true);
        setTimeout(() => {
            response.download(logPath);
        }, 500)
    } catch (err) {
        console.log(err);
        response.send({ err });
    }

}

export async function downloadLogs(request: any, response: any) {
    const { time } = request.body;
    try {
        let logPath = path.join(__dirname, "../../..", `logs/airtable.${time}.log`);
        response.download(logPath);
    } catch (err) {
        response.send({ err });
    }
}

