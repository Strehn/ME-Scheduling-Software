const express = require("express");
const router = express.Router();

const BillingCode = require("../../models/BillingCode");

// @route GET api/billingcodes/getCodes
// @desc Get all billing codes
// @access at the moment - public
router.get("/getCodes", (req, res) => {
    BillingCode.find({}).then(billingcodes => res.json(billingcodes));
}
);

router.post("/newCode", (req, res) => {
    BillingCode.findOne({ code: req.body.code }).then(billingcode => {
        if(billingcode) {
            return res.status(400).json({ code: "Code already exists" });
        } else {
            const newCode = new BillingCode({
                code: req.body.code,
                desc: req.body.desc,
            });

            newCode.save().then(billingcode => res.json(billingcode));
        }
    });
});

router.post("/checkCode", (req,res) => {
    BillingCode.findOne({ code: req.body.code }).then(billingcode => {
        if(billingcode) {
            return res.json(billingcode);
        } else {
            return res.status(404).json({ codenotfound: "Not Found"});
        }
    });
});

router.delete("/delete/:id", (req, res) => {
    BillingCode.findById(req.params.id).then(code => {
        code.remove().then(() => res.json({success: true}));
    });
}
);

module.exports = router;