import xlsxwriter
from django.core.management.base import BaseCommand
from main.scripts.get_data_functions import get_grades, get_module_courses, get_enumerate_courses


class Command(BaseCommand):
    def handle(self, *args, **options):
        workbook = xlsxwriter.Workbook('report.xlsx')
        worksheet = workbook.add_worksheet()

        header = workbook.add_format({
            'bg_color': '#EFCCF0',
            'color': 'black',
            # 'align': 'center',
            'valign': 'center',
            'bold': True,
            'font_size': 12,
            'border': 2,
            'font_name': 'Arial',
        })

        modules_style = workbook.add_format({
            'bg_color': '#B4F0C4',
            'color': 'black',
            'align': 'center',
            'bold': True,
            'font_size': 12,
            'border': 2,
            'font_name': 'Arial',
        })

        courses_style = workbook.add_format({
            'bg_color': '#C0F0E8',
            'color': 'black',
            'align': 'center',
            'valign': 'center',
            'bold': True,
            'font_size': 10,
            'border': 2,
            'font_name': 'Arial',
            'text_wrap': True
        })

        passed_style = workbook.add_format({
            'bg_color': '#BBF0A8'
        })

        failed_style = workbook.add_format({
            'bg_color': '#F0B09C'
        })

        standard_style = workbook.add_format({
            'color': 'black',
            'font_size': 9,
            'border': 1,
            'font_name': 'Arial'
        })

        worksheet.set_column(0, 0, 20)
        worksheet.set_column(0, 1, 25)
        worksheet.merge_range(0, 0, 1, 0, 'Филиал', header)
        worksheet.merge_range(0, 1, 1, 1, 'Фамилия, Имя', header)

        courses_data = get_module_courses()
        report_data = get_grades()

        cur_column = 2
        for module in courses_data.keys():
            if len(courses_data[module]) == 1:
                worksheet.write(0, cur_column, module, modules_style)
            else:
                worksheet.merge_range(0, cur_column, 0, cur_column + len(courses_data[module]) - 1, module, modules_style)

            for course in courses_data[module]:
                worksheet.write(1, cur_column, course, courses_style)
                cur_column += 1

        # worksheet.set_column(2, cur_column, 20)
        # worksheet.set_row(1, 50)
        worksheet.autofit()

        all_courses = get_enumerate_courses()
        for row in range(0, len(report_data)):
            worksheet.write(row + 2, 0, report_data[row]['branch'], standard_style)
            worksheet.write(row + 2, 1, report_data[row]['full_name'], standard_style)
            user_courses = report_data[row]['courses']

            for index in range(0, len(all_courses)):
                cell_text = ''
                if all_courses[index].name in user_courses:
                    cell_text = user_courses[all_courses[index].name]
                worksheet.write(row + 2, index + 2, cell_text, standard_style)

        worksheet.conditional_format(2, 2, len(report_data) + 2, cur_column,
                                     {'type': 'text',
                                      'criteria': 'begins with',
                                      'value': 'ПРОЙДЕН',
                                      'format': passed_style})

        worksheet.conditional_format(2, 2, len(report_data) + 2, cur_column,
                                     {'type': 'text',
                                      'criteria': 'begins with',
                                      'value': 'НЕ',
                                      'format': failed_style})

        workbook.close()
