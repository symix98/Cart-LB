const address = require('../../components/address/AddressController');


// router
const router = require('express').Router()

router.get('/address/:username', address.getAllAddressses);
router.get('/addressId/:cid', address.getAddressByClientId);
router.post('/address/create', address.createAddress);
module.exports = router