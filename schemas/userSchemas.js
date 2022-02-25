// Registration Schema
const registrationOpt = {
  schema: {
    body: {
      type: 'object',
      required: [
        'username',
        'email',
        'password',
        'confirmPassword',
        'phoneNumber'
      ],
      properties: {
        username: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        confirmPassword: { type: 'string' },
        phoneNumber: { type: 'number' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          acknowledged: { type: 'string' },
          insertedId: { type: 'string' }
        }
      }
    }
  }
}

// Login Schema

const loginOpt = {
  schema: {
    body: {
      type: 'object',
      required: ['email', 'password', 'token'],
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
        token: { type: 'string' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          username: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },
          phoneNumber: { type: 'string' },
          verified: { type: 'boolean' }
        }
      }
    }
  }
}

// Email Confirmation Schema

const emailConfirmationOpt = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          accepted: { type: 'array' },
          messageId: { type: 'string' },
          response: { type: 'string' },
          envelope: {
            from: { type: 'string' },
            to: { type: 'array' }
          }
        }
      }
    }
  }
}

// Email Verification Schema

const emailVerificationOpt = {
  schema: {
    body: {
      type: 'object',
      required: ['code'],
      properties: {
        code: { type: 'string' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          token:{type:'string'}
        }
      }
    }
  }
}

// Forgot Password Schema

const forgotPasswordOpt = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          msg: { type: 'string' }
        }
      }
    }
  }
}

// Verify Mobile Based OTP Code

const verifyCodeForPasswordOpt = {
  schema: {
    body: {
      type: 'object',
      required: ['code'],
      properties: {
        code: { type: 'string' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          msg: { type: 'string' }
        }
      }
    }
  }
}

// update Password

const updatePasswordOpt = {
  schema: {
    body: {
      type: 'object',
      required: ['previousPassword', 'newPassword', 'newConfirmPassword'],
      properties: {
        previousPassword: { type: 'string' },
        newPassword: { type: 'string' },
        newConfirmPassword: { type: 'string' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          lastErrorObject: {
            n: { type: 'number' },
            updatedExisting: { type: 'boolean' }
          },
          value: {
            _id: { type: 'string' },
            username: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            phoneNumber: { type: 'string' },
            verified: { type: 'boolean' }
          }
        }
      }
    }
  }
}
const setNewPasswordOpt = {
  schema: {
    body: {
      type: 'object',
      required: ['newPassword', 'newConfirmPassword'],
      properties: {
        newPassword: { type: 'string' },
        newConfirmPassword: { type: 'string' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          lastErrorObject: {
            n: { type: 'number' },
            updatedExisting: { type: 'boolean' }
          },
          value: {
            _id: { type: 'string' },
            username: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            phoneNumber: { type: 'string' },
            verified: { type: 'boolean' }
          }
        }
      }
    }
  }
}

module.exports = {
  registrationOpt,
  loginOpt,
  emailConfirmationOpt,
  emailVerificationOpt,
  forgotPasswordOpt,
  verifyCodeForPasswordOpt,
  updatePasswordOpt,
  setNewPasswordOpt
}
