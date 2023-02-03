from main.models import CompletionStatus, Course


def get_grades():
    list_grades = list(
        CompletionStatus.objects.order_by('employee__branch__name', 'employee__lastname', 'employee__firstname',
                                          'employee__code'))

    report_data = [{
        'branch': list_grades[0].employee.branch.name,
        'full_name': list_grades[0].employee.lastname + ' ' + list_grades[0].employee.firstname,
        'courses': {}
    }]

    for i in range(1, len(list_grades)):
        if list_grades[i].employee != list_grades[i - 1].employee:
            report_data.append({
                'branch': list_grades[i].employee.branch.name,
                'full_name': list_grades[i].employee.lastname + ' ' + list_grades[i].employee.firstname,
                'courses': {}
            })

        if list_grades[i].completed:
            report_data[-1]['courses'].update(
                {list_grades[i].course.name: 'ПРОЙДЕН (' + str(list_grades[i].grade) + '%)'})
        else:
            report_data[-1]['courses'].update(
                {list_grades[i].course.name: 'НЕ ПРОЙДЕН (' + str(list_grades[i].grade) + '%)'})

    return report_data


def get_module_courses():
    courses_pattern_dict = {}

    for course in list(Course.objects.order_by('module')):
        module_name = '' if (course.module is None) else course.module.name
        if module_name in courses_pattern_dict:
            courses_pattern_dict[module_name].append(course.name)
        else:
            courses_pattern_dict.update({module_name: [course.name]})

    return courses_pattern_dict


def get_enumerate_courses():
    courses = []
    for course in list(Course.objects.order_by('module')):
        courses.append(course)

    return courses