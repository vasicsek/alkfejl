'use strict'

const Validator = use('Validator')
const User = use('App/Model/User')
const Hash = use('Hash')

class UserController {
  * register(request, response) {
    const isLoggedIn = yield request.auth.check()
    if (isLoggedIn) {
      response.redirect('/')
    }

    yield response.sendView('register')
  }

  * login(request, response) {
    const isLoggedIn = yield request.auth.check()
    if (isLoggedIn) {
      response.redirect('/')
    }

    yield response.sendView('login')
  }

  * doLogin(request, response) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const login = yield request.auth.attempt(email, password)

      if (login) {
        response.redirect('/')
        return
      }
    }
    catch (err) {
      yield request
        .withAll()
        .andWith({
          errors: [
            {
              message: 'Invalid credentails'
            }
          ]
        })
        .flash()

      response.redirect('/login')
    }
  }

  * doRegister(request, response) {
    const registerData = request.except('_csrf');

    const rules = {
      username: 'required|alpha_numeric|unique:users',
      email: 'required|email|unique:users',
      password: 'required|min:4',
      password_confirm: 'required|same:password',
    };

    const validation = yield Validator.validateAll(registerData, rules)

    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash()
      response.redirect('back')
      return
    }

    const user = new User()

    user.username = registerData.username;
    user.email = registerData.email;
    user.password = yield Hash.make(registerData.password)
    yield user.save()

    yield request.auth.login(user)

    response.redirect('/')
  }

  * doLogout(request, response) {
    yield request.auth.logout()
    response.redirect('/')
  }

  * listUsers(request, response) {
    const users = yield User.all()
    console.log(users.size())

    yield response.sendView('users', {
      name: '',
      users: users.toJSON()
    })
  }

  * show(request, response) {
    const id = request.param('id');
    const user = yield User.find(id);
    //yield user.related('type').load();
    // response.send(user.toJSON())

    yield response.sendView('userSHow', {
      user: user.toJSON()
    })
  }

  * doDelete(request, response) {
    const id = request.param('id');
    const user = yield User.find(id);

    /*    if (request.currentUser.id !== user.user_id || request.currentUser.id !== 1) {
          response.unauthorized('Access denied.')
          return
        }*/

    yield user.delete()
    response.redirect('/')
  }

  * edit(request, response) {
    const id = request.param('id');
    const user = yield User.find(id);
    // console.log(user.toJSON())

    yield response.sendView('userEdit', {
      user: user.toJSON()
    });
  }

  * doEdit(request, response) {
    const userData = request.except('_csrf');

    const rules = {
      username: 'required',
      email: 'required',
      password: 'required'
    };

    const validation = yield Validator.validateAll(userData, rules)

    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash()
      response.redirect('back')
      return;
    }

    const id = request.param('id');
    const user = yield User.find(id);

    // Object.assign(user, userData)

    user.username = userData.username;
    user.email = userData.email;
    user.password = yield Hash.make(userData.password);

    yield user.save()

    response.redirect('/')
  }

  * ajaxLogin(request, response) {
    const email = request.input('email');
    const password = request.input('password');

    try {
      const login = yield request.auth.attempt(email, password);
      if (login) {
        response.send({ success: true });
        return;
      }
    }
    catch (err) {
    }
    response.send({ success: false });
  }

  * ajaxRegister(request, response) {
    const registerData = request.except('_csrf');

    const rules = {
      username: 'required|alpha_numeric|unique:users',
      email: 'required|email|unique:users',
      password: 'required|min:4',
      password_confirm: 'required|same:password',
    };

    const validation = yield Validator.validateAll(registerData, rules)

    if (validation.fails()) {

      response.send({ success: false })
      return
    }

    const user = new User()

    user.username = registerData.username;
    user.email = registerData.email;
    user.password = yield Hash.make(registerData.password)
    yield user.save()

    yield request.auth.login(user)
    response.send({ success: true })
  }
}

module.exports = UserController