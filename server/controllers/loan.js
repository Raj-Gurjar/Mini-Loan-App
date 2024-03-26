const Loan = require("../models/loan.model");
const Payment = require("../models/payment.model");

const calculatePayments = (loan, payments) => {
  const { _id } = loan;
  const scheduledPayments = [];

  for (let i = 0; i < payments.length; i++) {
    const payment = new Payment({
      loanId: _id,
      amount: payments[i].amount,
      totalAmount: payments[i].amount,
      date: payments[i].date,
      status: "PENDING",
    });
    scheduledPayments.push(payment);
  }

  return scheduledPayments;
};

exports.createLoan = async (req, res) => {
  try {
    const { userId, amount, term, payments } = req.body;
    const user = req.user;
    // console.log(payments);

    if (user.isAdmin) {
      return res.status(401).json({
        success: false,
        message: "Only user can create loans!",
      });
    }

    const loan = await Loan.create({ userId, amount, term });

    const scheduledPayments = calculatePayments(loan, payments);

    await Payment.insertMany(scheduledPayments);

    return res.status(200).json({
      success: true,
      message: "Successfully created loan!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find({}).populate({
      path: "userId",
      select: "name email isAdmin",
    });
 
    return res.status(200).json({
      success: true,
      message: "success!",
      loans,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getLoansById = async (req, res) => {
  try {
    const userId = req.params.id;

    const loans = await Loan.find({ userId });

    return res.status(200).json({
      success: true,
      message: "success!",
      loans,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPaymentsById = async (req, res) => {
  try {
    const loanId = req.params.id;

    const payments = await Payment.find({ loanId });

    return res.status(200).json({
      success: true,
      message: "success!",
      payments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.doPayment = async (req, res) => {
  try {
    const { loanId, amount } = req.body;

    const loan = await Loan.findById(loanId);

    if (!loan || loan.state === "PAID") {
      return res.status(404).json({
        success: false,
        message: "Loan not found or already paid.",
      });
    }

    const pendingPayments = await Payment.find({
      loanId,
      status: "PENDING",
    }).sort("dueDate");

    if (pendingPayments.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No pending payments found.",
      });
    }

    let remainingAmount = amount;

    for (const payment of pendingPayments) {
      if (remainingAmount <= 0) break;

      const paidAmount = Math.min(payment.amount, remainingAmount);
      remainingAmount -= paidAmount;

      payment.amount -= paidAmount;
      if (payment.amount === 0) {
        payment.status = "PAID";
      }

      await payment.save();
    }

    const allPaymentsPaid = pendingPayments.every(
      (payment) => payment.status === "PAID"
    );

    if (allPaymentsPaid) {
      loan.state = "PAID";
      await loan.save();
    }

    return res.status(200).json({
      success: true,
      message: "Payment successful!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateState = async (req, res) => {
  try {
    const { loanId, state } = req.body;


    const loan = await Loan.findOne({ _id: loanId });

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: "Loan request not found!",
      });
    }

    if (loan.state !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: "Request has already been processed!",
      });
    }

    loan.state = state;
    // console.log("state bk", state);


    await loan.save();
    // console.log("loanbk", loan);
    return res.status(200).json({
      success: true,
      message: "Loan state updated successfully!",
    });
    // console.log("Error ! in updating Status by Admin");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });


  }
};
