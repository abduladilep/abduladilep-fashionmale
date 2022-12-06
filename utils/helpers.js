const bcrypt = require('bcrypt')
const Razorpay = require('razorpay')

function hashPassword(password) {
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(password, salt)
}

function comparePassword(raw, hash) {
    return bcrypt.compareSync(raw, hash)
}

function hashOTP(OTP) {
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(OTP, salt)
}

function compareOTP(raw, hash) {
    return bcrypt.compareSync(raw, hash)
}

const instance = new Razorpay({
    key_id: 'rzp_test_DftcNjVgIfTLh3',
    key_secret: 'LnXYr13itN7IURlRoX9YCVrn'
})

function generateRazorpay(orderId, bill) {
    return new Promise((resolve, reject) => {
        const options = {
            amount: bill * 100,
            currency: "INR",
            receipt: `${orderId}`
        };
        instance.orders.create(options, function (err, order) {
            if (err) {
                console.log(err)
            } else {
                console.log(order)
                resolve(order)
            }
        })
    })

}

function verifyPayment(details) {
    return new Promise((resolve, reject) => {
        const crypto = require('crypto')
        let hmac = crypto.createHmac('sha256', 'LnXYr13itN7IURlRoX9YCVrn')
        hmac.update(details.payment.razorpay_order_id + '|' + details.payment.razorpay_payment_id, 'LnXYr13itN7IURlRoX9YCVrn')
        hmac = hmac.digest('hex')
        if (hmac == details.payment.razorpay_signature) {
            resolve()
        } else {
            reject()
        }
    })
}

module.exports = {
    hashPassword,
    comparePassword,
    hashOTP,
    compareOTP,
    generateRazorpay,
    verifyPayment
}