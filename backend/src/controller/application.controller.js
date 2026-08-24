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
    const application = await Application.find();
    return res.status(200).json({
      success: true,
      message: "Applications fetched successfully",
      data: application,
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

    const application = await Application.findByIdAndUpdate(id, req.body,
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

    const application = await Application.findByIdAndDelete(id);

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

    const application = await Application.findByIdAndUpdate(
      id,
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
    const application = await Application.findById(id);  
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


       
