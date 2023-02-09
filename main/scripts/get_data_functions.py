from main.models import CompletionStatus, Module


def get_grades():
    list_grades = list(
        CompletionStatus.objects.order_by('employee__branch__name', 'employee__lastname', 'employee__firstname',
                                          'employee__code'))

    report_data = [{
        'branch': list_grades[0].employee.branch.name,
        'full_name': list_grades[0].employee.lastname + ' ' + list_grades[0].employee.firstname,
        'modules': {}
    }]

    for i in range(1, len(list_grades)):
        if list_grades[i].employee != list_grades[i - 1].employee:
            report_data.append({
                'branch': list_grades[i].employee.branch.name,
                'full_name': list_grades[i].employee.lastname + ' ' + list_grades[i].employee.firstname,
                'modules': {}
            })

        if list_grades[i].completed:
            report_data[-1]['modules'].update(
                {list_grades[i].module.name: 'ПРОЙДЕН (' + str(list_grades[i].grade) + '%)'})
        else:
            report_data[-1]['modules'].update(
                {list_grades[i].module.name: 'НЕ ПРОЙДЕН (' + str(list_grades[i].grade) + '%)'})

    return report_data


def get_category_modules():
    modules_pattern_dict = {}

    for module in list(Module.objects.order_by('course__category_id', 'name')):
        category_name = '' if (module.course.category is None) else module.course.category.name
        if category_name in modules_pattern_dict:
            modules_pattern_dict[category_name].append(module.name)
        else:
            modules_pattern_dict.update({category_name: [module.name]})

    return modules_pattern_dict


def get_enumerate_modules():
    modules = []
    for module in list(Module.objects.order_by('course__category_id', 'name')):
        modules.append(module)

    return modules
