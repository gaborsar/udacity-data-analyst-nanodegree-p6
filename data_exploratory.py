import csv

# This script creates a subset of the pisa2012.csv file that is used in the plots.r file.

# This scipt collects the necessary information from the pisa2012.csv file
# and stores it in the pisa2012_vis.csv file. The resulting file is used in the plots.r file
# for exploratory visualizations.

# approximate running time : 80 seconds
# file size in             : 2.6G
# file size out            : 106M

filename_in = 'pisa2012.csv'
filename_out = 'pisa2012_exploratory.csv'

fieldnames = [
    'MISCED',  # Educational level of mother (ISCED)
    'FISCED',  # Educational level of father (ISCED)
    'ST83Q01', # Teacher Support - Lets Us Know We Have to Work Hard
    'ST83Q02', # Teacher Support - Provides Extra Help When Needed
    'ST83Q03', # Teacher Support - Helps Students with Learning
    'ST83Q04', # Teacher Support - Gives Opportunity to Express Opinions
    'ST57Q01', # Out-of-School Study Time - Homework
    'ST57Q02', # Out-of-School Study Time - Guided Homework
    'ST57Q03', # Out-of-School Study Time - Personal Tutor
    'ST57Q04', # Out-of-School Study Time - Commercial Company
    'ST57Q05', # Out-of-School Study Time - With Parent
    'ST57Q06', # Out-of-School Study Time - Computer
    'ST87Q01', # Sense of Belonging - Feel Like Outsider
    'ST87Q02', # Sense of Belonging - Make Friends Easily
    'ST87Q03', # Sense of Belonging - Belong at School
    'ST87Q04', # Sense of Belonging - Feel Awkward at School
    'ST87Q05', # Sense of Belonging - Liked by Other Students
    'ST87Q06', # Sense of Belonging - Feel Lonely at School
    'ST87Q07', # Sense of Belonging - Feel Happy at School
    'ST87Q08', # Sense of Belonging - Things Are Ideal at School
    'ST87Q09', # Sense of Belonging - Satisfied at School
    'ST93Q01', # Perseverance - Give up easily
    'ST93Q03', # Perseverance - Put off difficult problems
    'ST93Q04', # Perseverance - Remain interested
    'ST93Q06', # Perseverance - Continue to perfection
    'ST93Q07', # Perseverance - Exceed expectations
    'ST29Q01', # Math Interest - Enjoy Reading
    'ST29Q03', # Math Interest - Look Forward to Lessons
    'ST29Q04', # Math Interest - Enjoy Maths
    'ST29Q06', # Math Interest - Interested
]

cleaning_map = {
    'ISCED 3A, ISCED 4': 'ISCED 3A, 4',
}

def clean_value(fieldname, value):
    value = value.strip()
    if value in cleaning_map:
        value = cleaning_map[value]
    return value

def clean_row(row_in):
    row_out = {}
    for fieldname in fieldnames:
        row_out[fieldname] = clean_value(fieldname, row_in[fieldname])
    return row_out

with open(filename_in) as file_in:
    with open(filename_out, 'wb') as file_out:
        reader = csv.DictReader(file_in)
        writer = csv.DictWriter(file_out, fieldnames=fieldnames)
        writer.writeheader()
        for row_in in reader:
            row_out = clean_row(row_in)
            writer.writerow(row_out)
