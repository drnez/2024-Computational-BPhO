import matplotlib
import matplotlib.pyplot as plt
import math

matplotlib.use('Qt5Agg')
fig, ax = plt.subplots()

def sin(deg):
    return math.sin(math.radians(deg))
def cos(deg):
    return math.cos(math.radians(deg))
def tan(deg):
    return math.tan(math.radians(deg))

# user adjustables:
theta = 42
u = 10
h = 1
g = 9.81
t_step = 0.02

# initalisation:
x = []
y = []
t = 0
x_now = 0
y_now = h

# Initial Sin/Cos Theta (reduce num of calcs):
ist = sin(theta)
ict = cos(theta)
itt = tan(theta)
Range = ( (u*u)/g ) * ( ist*ict + ict*math.sqrt( ist*ist + (2*g*h)/(u*u) ) )

# print to user as useful info, not for graph:
total_time = Range / (u*ict)
x_apogee = ( (u*u)/g ) * ist*ict
y_apogee = h + ( (u*u)/(2*g) )*ist*ist

while (x_now <= Range):
    x.append(x_now)
    y.append(y_now)

    x_now = t * u*ict
    y_now = h + x_now*itt - ( (g/(2*u*u))*(1+itt*itt)*(x_now*x_now) )

    t += t_step

ax.plot(x, y)
plt.show()
