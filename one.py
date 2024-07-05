import matplotlib
import matplotlib.pyplot as plt
import math

matplotlib.use('Qt5Agg')              # Use TkAgg backend
fig, ax = plt.subplots()             # Create a figure containing a single Axes.

# user adjustables:
theta = 45
u = 20
h = 2
g = 9.81
t_step = 0.02

x = []
y = []

t = 0
x_now = 0
y_now = h

while (y_now >= 0):
    x.append(x_now)
    y.append(y_now)

    ux = u*math.cos(math.radians(theta))
    uy = u*math.sin(math.radians(theta))
    vx = ux
    vy = uy - g*t

    x_now = ux*t
    y_now = h + uy*t - 0.5*g*t*t

    t += t_step

ax.plot(x, y)  # Plot some data on the Axes.
plt.show()                           # Show the figure.
