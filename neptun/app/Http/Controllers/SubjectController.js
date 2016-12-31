'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const Subject = use('App/Model/Subject')
const Validator = use('Validator')

class SubjectController {

  * index(request, response) {

    const categories = yield Category.all()

    for (let category of categories) {
      const subjects = yield category.subjects().fetch();
      category.topSubjects = subjects.toJSON();
    }

    yield response.sendView('main', {
      name: '',
      categories: categories.toJSON()
    })
  }

  * create(request, response) {
    const categories = yield Category.all()
    yield response.sendView('subjectCreate', {
      categories: categories.toJSON()
    });
  }

  * doCreate(request, response) {
    const subjectData = request.except('_csrf');

    const rules = {
      name: 'required',
      semester: 'required',
      credit: 'required',
      category_id: 'required'
    };

    const validation = yield Validator.validateAll(subjectData, rules)

    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash()
      response.redirect('back')
      return
    }

    subjectData.user_id = request.currentUser.id
    const subject = yield Subject.create(subjectData)
    response.redirect('/')
  }

  * edit(request, response) {
    const categories = yield Category.all()
    const id = request.param('id');
    const subject = yield Subject.find(id);

    if (request.currentUser.id !== subject.user_id && request.currentUser.id !== 1) {
      response.unauthorized('Access denied.')
      return
    }


    yield response.sendView('subjectEdit', {
      categories: categories.toJSON(),
      subject: subject.toJSON()
    });
  }

  * doEdit(request, response) {
    const subjectData = request.except('_csrf');

    const rules = {
      name: 'required',
      semester: 'required',
      credit: 'required',
      category_id: 'required'
    };

    const validation = yield Validator.validateAll(subjectData, rules)

    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash()
      response.redirect('back')
      return
    }

    const id = request.param('id');
    const subject = yield Subject.find(id);

    subject.name = subjectData.name;
    subject.semester = subjectData.semester;
    subject.credit = subjectData.credit;
    subject.category_id = subjectData.category_id;

    yield subject.save()

    response.redirect('/')
  }

  * show(request, response) {
    const id = request.param('id');
    const subject = yield Subject.find(id);
    yield subject.related('category').load();

    yield response.sendView('subjectShow', {
      subject: subject.toJSON()
    })
  }

  * doDelete(request, response) {
    const id = request.param('id');
    const subject = yield Subject.find(id);

    if (request.currentUser.id !== subject.user_id && request.currentUser.id !== 1) {
      response.unauthorized('Access denied.')
      return
    }

    yield subject.delete()
    response.redirect('/')
  }

  * ownList(request, response) {
    const categories = yield Category.all()

    for (let category of categories) {

      const subjects = yield category.subjects().fetch();

      var subjects2 = subjects.filter(i => i.user_id == request.currentUser.id);
      if (request.currentUser.id == 1) {
        category.topSubjects = subjects.toJSON();
      } else {
        category.topSubjects = subjects2.toJSON();
      }


    }

    yield response.sendView('main', {
      name: '',
      categories: categories.toJSON()
    })


  }

  * search(request, response) {
    const categories = yield Category.all()
    var search = request.input('search');

    for (let category of categories) {
      const subjects = yield category.subjects().fetch();
      var subjects2 = subjects.filter(i => i.name.indexOf(search) > -1);
      category.topSubjects = subjects2.toJSON();
    }

    yield response.sendView('main', {
      name: '',
      categories: categories.toJSON()
    })
  }

  * ajaxCreate(request, response) {
    const subjectData = request.except('_csrf');

    const rules = {
      name: 'required',
      semester: 'required',
      credit: 'required',
      category_id: 'required'
    };

    const validation = yield Validator.validateAll(subjectData, rules)

    if (validation.fails()) {
      response.send({ success: false })
      return
    }

    subjectData.user_id = request.currentUser.id
    const subject = yield Subject.create(subjectData)
    response.send({ success: true })
  }
}

module.exports = SubjectController