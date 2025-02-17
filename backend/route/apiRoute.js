const express  = require("express");
const router  = express.Router();

const { getAllApis, createApi, updateApi, deleteApi, getApiDetails, getAllApisAdmin} = require("../controller/apiController");
const { getAllMetrics } = require("../controller/adminMetricsController");
const { isAuthentictedUser, authorizeRoles } = require("../middleWare/auth");
 
 

router.route("/api").get(getAllApis)
router.route("/admin/api/new").post(isAuthentictedUser, authorizeRoles("admin"), createApi);
router.route("/admin/api/metrics").get(isAuthentictedUser, authorizeRoles("admin"), getAllMetrics);
router.route("/admin/apis").get(isAuthentictedUser , authorizeRoles("admin") , getAllApisAdmin)
router.route("/admin/api/:id") 
.put(isAuthentictedUser, authorizeRoles("admin"), updateApi)
.delete(isAuthentictedUser, authorizeRoles("admin"), deleteApi);
router.route("/api/:id").get(getApiDetails);
module.exports = router  