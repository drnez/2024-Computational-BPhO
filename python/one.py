import matplotlib
import matplotlib.pyplot as plt
import math

matplotlib.use('Qt5Agg')
fig, ax = plt.subplots()

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
    ux = u*math.cos(math.radians(theta))
    uy = u*math.sin(math.radians(theta))
    vx = ux
    vy = uy - g*t

    x_now = ux*t
    y_now = h + uy*t - 0.5*g*t*t

    x.append(x_now)
    y.append(y_now)

    t += t_step

ax.plot(x, y)
plt.show()
