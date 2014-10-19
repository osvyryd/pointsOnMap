package com.softserve.tasks.task_2.task_2_1;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by BAXA on 15.10.2014.
 */
public class PointsOnMap implements IPointsFinder {
    private Collection<IPoint> points;
    public static final int AVERAGE_LENGTH_ONE_DEGREE = 111200;

    private long calculateDistance(IPoint point1, IPoint point2){
        return Math.round(AVERAGE_LENGTH_ONE_DEGREE*Math.acos(Math.sin(point1.getLatitudeOnRad())*Math.sin(point2.getLatitudeOnRad())+Math.cos(point1.getLatitudeOnRad())*Math.cos(point2.getLatitudeOnRad())*Math.cos(point2.getLongitudeOnRad()- point1.getLongitudeOnRad()))*180/Math.PI);
    }
    
    public PointsOnMap(Collection<IPoint> points) {
        this.points = points;
    }

    public PointsOnMap() {
        this.points = new HashSet<IPoint>();
    }

    public Collection<IPoint> getPoints() {
        return points;
    }

    public void setPoints(Set<IPoint> points) {
        this.points = points;
    }

    public Collection<IPoint> getPointsNearMe(IPoint targetPoint, int radius){
        if(! points.isEmpty()){
            Set<IPoint> result = new HashSet<IPoint>();
            for(IPoint currentPoint : points){
                if(calculateDistance(targetPoint, currentPoint)<radius){
                    result.add(currentPoint);
                }
            }
            return result;
        }
        return null;
    }
}
