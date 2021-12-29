import { convertToDotNotation, removeObjKeyValueNull, reshape } from "../helpers/reshape.js";

export const find = async (req, res)=> {
    let query={};
    let result ='';
    
    if (Object.keys(req.query).length > 0) {
        const {q} = req.query;
        console.log(req.query);
        query = {
            $or: [
                {name: {$regex: q+"", $options: "$i"}},
                {phone: {$regex: q+"", $options: "$i"}}
            ]
        };
    }   
    result =  await Model.find(query).sort({createdAt: 'desc'});;
    return result;    
};

// filter or sort by date
export const filterByDate = async (req, res) => {
    // only date filters applied
    const {startDate, endDate} = req.query;
    // const query = {};
    if(Date.parse(endDate) <= Date.parse(startDate)){
        res.status(400);
        throw new Error("Bad Request: 400!! 'End date cannot be greater than start date'");
    }
    
    result =  await Model.find({
        createdAt: { "$gte": startDate, "$lt": endDate }
    }).sort({createdAt: 'desc'});;
    return result;
};

export const create = async (req, res, model)=>{
        
    const reqBody = req.body;
    let result = await model.create(reqBody);
    // will respond according to the request body passed;
    result = reshape(result, reqBody);
    // console.log(result);
    return result;
};

export const findOne = async (req, res, model) =>{
    const { id } = req.params;
    const result  = await model.findById(id);
    return result;
};

export const update = async(req, res, model)=>{
    let reqBody = req.body;
    const { id } = req.params;
    console.log(reqBody);
    // converting to dot notation for ease of update
    reqBody = convertToDotNotation(reqBody);
    // stripping off any null key value pairs
    removeObjKeyValueNull(reqBody);
    const result = await model.findByIdAndUpdate(id, reqBody, {
            runValidators: true,
            new: true
        }
    );
    return result
};

export const remove = async(req, res, model) => {
    const {id} = req.params;
    const removed = await model.findByIdAndDelete(id);
    if(!removed){
        res.status(404);
        throw new Error("Value Does Not Exist");
    }
    return removed;
};