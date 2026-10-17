import Application from "../models/application.model.js";


export const createApplication = async (req, res) => {
  try {
    const { company, role, status, appliedDate, notes } = req.body;
    if (!company || !role || !appliedDate) {
      return res.status(400).json({
        success: false,
        message: "Company, role and applied date are required",
      });
    }
    const application = await Application.create({
      user: req.user.id,
      company,
      role,
      status,
      appliedDate,
      notes,
    })
    return res.status(201).json({
          success: true,
          message: "Application created successfully",
          data: application,
        });
  } catch (error) {
    return res.status(500).json({
         success: false,
         message: error.message,
       });      
  }
};    


export const getApplications = async (req, res) => {
  try {    

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10; 
    const skip = (page - 1) * limit;    //age page 1 hai to skipp 0 and 2 hai to skipp 10

        const application = await Application.find({ user: req.user.id }).skip(skip).limit(limit);

    const totalApplications = await Application.countDocuments({ user: req.user.id });
    const totalPages = Math.ceil(totalApplications / limit);
    
    return res.status(200).json({
      success: true,
      message: "Applications fetched successfully",
      data: application,
      pagination: {
        page,
        limit,
        totalPages,
        totalApplications,
        totalapplication: totalApplications,
      },
    })   
    
  } catch (error) {
    return res.status(500).json({
         success: false,
         message: error.message,
       });      
  }
};

export const updateApplication = async (req, res) => {
  try {  
    const { id } = req.params; 

    const application = await Application.findOneAndUpdate({ _id: id, user: req.user.id }, req.body,
      { new: true, runValidators: true });
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Application updated successfully",
      data: application,
    }); } catch (error) {
    return res.status(500).json({
         success: false,
         message: error.message,
       });      
  }
};


export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findOneAndDelete({ _id: id, user: req.user.id });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateApplicationStatus = async (req, res) => {
  try {
    const {id} = req.params;
    const {status} = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const application = await Application.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      data: application,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};  

export const getApplicationById = async (req, res) => {
  try {
    const id = req.params.id?.trim();   
    const application = await Application.findOne({ _id: id, user: req.user.id });  
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Application fetched successfully",
      data: application,
    });
    
  } catch (error) {
    return res.status(500).json({
         success: false,
         message: error.message,
       });      
  }
};


       
