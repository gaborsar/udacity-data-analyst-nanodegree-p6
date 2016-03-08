import csv

# This script collects the necessary information from the pisa2012.csv file
# and stores it in the pisa2012_explanatory.csv file. The resulting file is used in the app.js file
# for explanatory visualizations.

# approximate running time : 70 seconds
# file size in             : 2.6G
# file size out            : 17K

filename_in = 'pisa2012.csv'
filename_out = 'pisa2012_explanatory.csv'

teacher_support_keys = [
    'ST83Q01', # Teacher Support - Lets Us Know We Have to Work Hard
    'ST83Q02', # Teacher Support - Provides Extra Help When Needed
    'ST83Q03', # Teacher Support - Helps Students with Learning
    'ST83Q04', # Teacher Support - Gives Opportunity to Express Opinions
]

math_interest_keys = [
    'ST29Q01', # Math Interest - Enjoy Reading
    'ST29Q03', # Math Interest - Look Forward to Lessons
    'ST29Q04', # Math Interest - Enjoy Maths
    'ST29Q06', # Math Interest - Interested
]

values = ['Strongly disagree', 'Disagree', 'Agree', 'Strongly agree']

teacher_support_values = values
math_interest_values = values

# create empty nested data
# {
#   $teacher_support_key: {
#     $teacher_support_value: {
#       $math_interest_key: {
#         $math_interest_value: {
#           count: 0,
#           proportion: 0.0
#         }
#       }
#     }
#   }
# }

print 'create nested data'

data_nested = {}
for tsk in teacher_support_keys:
    data_nested[tsk] = {}
    for tsv in teacher_support_values:
        data_nested[tsk][tsv] = {}
        for mik in math_interest_keys:
            data_nested[tsk][tsv][mik] = {}
            for miv in math_interest_values:
                data_nested[tsk][tsv][mik][miv] = {
                    'count': 0,
                    'proportion': 0.0
                }

# update counts in nested data
# {
#   $teacher_support_key: {
#     $teacher_support_value: {
#       $math_interest_key: {
#         $math_interest_value: {
#           count: $count,
#           proportion: 0.0
#         }
#       }
#     }
#   }
# }

print 'update counts in nested data'

with open(filename_in) as file_in:
    reader = csv.DictReader(file_in)
    for row in reader:
        for tsk in teacher_support_keys:
            if row[tsk] in values:
                tsv = row[tsk]
                for mik in math_interest_keys:
                    if row[mik] in values:
                        miv = row[mik]
                        data_nested[tsk][tsv][mik][miv]['count'] += 1

# update proportions in nested data
# {
#   $teacher_support_key: {
#     $teacher_support_value: {
#       $math_interest_key: {
#         $math_interest_value: {
#           count: $count,
#           proportion: $proportion
#         }
#       }
#     }
#   }
# }

print 'update proportions in nested data'

for tsk in teacher_support_keys:
    for tsv in teacher_support_values:
        for mik in math_interest_keys:
            total_count = 0.0
            for miv in math_interest_values:
                total_count += data_nested[tsk][tsv][mik][miv]['count']
            for miv in math_interest_values:
                count = data_nested[tsk][tsv][mik][miv]['count']
                data_nested[tsk][tsv][mik][miv]['proportion'] = count / total_count

# create flatten data
# [
#   {
#     teacherSupportKey: $teacher_support_key,
#     teacherSupportValue: $teacher_support_value,
#     mathInterestKey: $math_interest_key,
#     mathInterestValue: $math_interest_value,
#     count: $count,
#     proportion: $proportion
#   },
#   (...)
# }

print 'create flatten data'

data_flatten = []
for tsk in teacher_support_keys:
    for tsv in teacher_support_values:
        for mik in math_interest_keys:
            for miv in math_interest_values:
                data_flatten.append({
                    'teacherSupportKey': tsk,
                    'teacherSupportValue': tsv,
                    'mathInterestKey': mik,
                    'mathInterestValue': miv,
                    'count': data_nested[tsk][tsv][mik][miv]['count'],
                    'proportion': data_nested[tsk][tsv][mik][miv]['proportion'],
                })

# write flatten data out

print 'write flatten data out'

fieldnames = [
    'teacherSupportKey',
    'teacherSupportValue',
    'mathInterestKey',
    'mathInterestValue',
    'count',
    'proportion',
]

with open(filename_out, 'wb') as file_out:
    writer = csv.DictWriter(file_out, fieldnames=fieldnames)
    writer.writeheader()
    for row in data_flatten:
        writer.writerow(row)

print 'done'
