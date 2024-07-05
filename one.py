import matplotlib
import matplotlib.pyplot as plt
import math

matplotlib.use('Qt5Agg')              # Use TkAgg backend
fig, ax = plt.subplots()             # Create a figure containing a single Axes.

theta = 45
u = 20
h = 2
g = 9.81
t_step = 0.02

y = 0
t = 0

while (y >= 0):
    ux = u*math.cos(math.radians(theta))
    uy = u*math.sin(math.radians(theta))
    vx = ux
    vy = uy - g*t
    t += t_step

ax.plot([1, 2, 3, 4], [1, 4, 2, 3])  # Plot some data on the Axes.
plt.show()                           # Show the figure.
