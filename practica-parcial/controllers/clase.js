const clase = require('../models/clase');

exports.create = (req, res) => {
    
    let claseNueva = new clase({
        name: req.body.name,
        uvs: req.body.uvs,
        descripcion: req.body.descripcion
    });

    claseNueva.save()
    .then(data => {
        res.send({
            ok:true,
            clase:data
        });
    })
    .catch(err => {
        return res.status(500).send({
            ok:false,
            message: "Internal error creating class.",
            error: err
        });
    });
    
}

exports.findAll = (req,res) => {
    clase.find()
    .then(clases => {
        res.send({
            ok:true,
            clases: clases
        });
    })
    .catch(err => {
        return res.status(500).send({
            ok:false,
            message:"Internal error finding all classes.",
            error: err
        });
    })
}

exports.update = (req,res) => {
    clase.findByIdAndUpdate(req.params.claseId, {
        name: req.body.name,
        uvs:req.body.uvs,
        descripcion: req.body.descripcion
    }, {new:true})
    .then(updated => {
        res.send({
            ok:true,
            updated:updated
        });
    })
    .catch(err => {
        return res.status(500).send({
            ok:false,
            message:"Internal error updating class.",
            error:err
        });
    });
}

exports.delete = (req,res) => {
    clase.findByIdAndDelete(req.params.claseId)
    .then(deleted => {
        res.send({
            ok:true,
            deleted:deleted
        });
    })
    .catch(err => {
        return res.status(500).send({
            ok:false,
            message: "Internal error deleting class",
            error:err
        });
    });
}