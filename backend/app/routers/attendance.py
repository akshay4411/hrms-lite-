from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/attendance", tags=["Attendance"])

@router.post("/", response_model=schemas.AttendanceResponse, status_code=201)
def mark_attendance(data: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    if data.status not in ["Present", "Absent"]:
        raise HTTPException(status_code=400, detail="Status must be Present or Absent")

    employee = db.query(models.Employee).filter(models.Employee.id == data.employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    new_attendance = models.Attendance(**data.dict())
    db.add(new_attendance)

    try:
        db.commit()
        db.refresh(new_attendance)
    except:
        db.rollback()
        raise HTTPException(status_code=409, detail="Attendance already marked for this date")

    return new_attendance

@router.get("/{employee_id}")
def get_attendance(employee_id: int, db: Session = Depends(get_db)):
    return db.query(models.Attendance).filter(models.Attendance.employee_id == employee_id).all()
