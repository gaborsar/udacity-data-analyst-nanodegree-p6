import csv
import sys

(filename, key) = sys.argv[1:]

values = set()

with open(filename) as file:
    reader = csv.DictReader(file)
    for row in reader:
        values.add(row[key])

print 'values of {0} in {1}: {2}'.format(filename, key, values)
