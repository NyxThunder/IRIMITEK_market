const express  = require("express");
const router  = express.Router();

const { getAllOffers, getOfferDetails, deleteOffer, updateOffer, getAllApis, connectApi, importApi, exportApi, createApi, updateApi, deleteApi, getApiDetails, getAllApisAdmin} = require("../controller/apiController");
const { getAllMetrics } = require("../controller/adminMetricsController");
const { isAuthentictedUser, authorizeRoles } = require("../middleWare/auth");
 
 

router.route("/admin/api").get(getAllApis)
router.route("/admin/api/new").post(isAuthentictedUser, authorizeRoles("admin"), createApi);
router.route("/admin/api/connect/:id").post(isAuthentictedUser, authorizeRoles("admin"), connectApi);
router.route("/admin/api/import/:id").post(isAuthentictedUser, authorizeRoles("admin"), importApi);
router.route("/admin/api/offers/export/:id").post(isAuthentictedUser, authorizeRoles("admin"), exportApi);
router.route("/admin/api/offers").get(isAuthentictedUser, authorizeRoles("admin"), getAllOffers);
router.route("/admin/api/offers/:offerId").delete(isAuthentictedUser, authorizeRoles("admin"), deleteOffer);
router.route("/admin/api/offers/:offerId").post(isAuthentictedUser, authorizeRoles("admin"), updateOffer);
router.route("/admin/api/offers/:offerId").get(isAuthentictedUser, authorizeRoles("admin"), getOfferDetails);  

router.route("/admin/api/metrics").get(isAuthentictedUser, authorizeRoles("admin"), getAllMetrics);
router.route("/admin/apis").get(isAuthentictedUser , authorizeRoles("admin") , getAllApisAdmin)
router.route("/admin/api/:id") 
.put(isAuthentictedUser, authorizeRoles("admin"), updateApi)
.delete(isAuthentictedUser, authorizeRoles("admin"), deleteApi)
.get(isAuthentictedUser, authorizeRoles("admin"), getApiDetails);
module.exports = router  