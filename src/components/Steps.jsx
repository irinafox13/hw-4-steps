import { useState } from "react";

const Steps = () => {
    const [form, setForm] = useState('');
    const [steps, setSteps] = useState([
        {"id": 1, "date": '2012-11-11', "distance": 5.5},
        {"id": 2, "date": '2011-06-10', "distance": 2.1},
        {"id": 3, "date": '2022-01-01', "distance": 12.5}
    ]);

    const handlerChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const addStep = (e) => {
        e.preventDefault();
        if (form.date && form.distance) {
            let newDistance = form.distance;
            steps.forEach((step) => {
                if (step.date === form.date) {
                    newDistance = +form.distance + +step.distance
                }
            })

            let newEntry = {"id": Math.random(), "date": form.date, "distance": newDistance}    
            setForm({
                date: '',
                distance: ''
            })
            let newSteps = steps.filter(step => step.date !== form.date)
            setSteps([...newSteps, newEntry])
        }
    }

    const deleteStep = (id) => {
        let newSteps = steps.filter(step => step.id !== id)
        setSteps(newSteps)
    }

    return (
        <div className="w-50 mx-auto">
            <form className="d-flex align-items-end p-3" onSubmit={addStep}>
                <div className="me-3 col-4">
                    <label htmlFor="date" className="form-label text-left">Дата (ДД.ММ.ГГ)</label>
                    <input 
                        type="date" 
                        value={form.date}
                        onChange={handlerChange}
                        className="form-control" 
                        id="date"
                        name="date"
                    />
                </div>
                <div className="me-3 col-4">
                    <label htmlFor="distance" className="form-label">Пройдено км</label>
                    <input 
                        type="number" 
                        step="0.1"
                        value={form.distance}
                        onChange={handlerChange}
                        className="form-control" 
                        id="distance"
                        name="distance"
                    />
                </div>
                <button type="submit" className="btn btn-outline-secondary col-2">ОК</button>
            </form>
            {steps && steps.length ? '' : 'Список пуст'}
            {steps && steps.length !== 0 && 
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Дата (ДД.ММ.ГГ)</th>
                        <th scope="col">Пройдено км</th>
                        <th scope="col">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {steps
                        .sort((a, b) => a.date < b.date ? 1 : -1)
                        .map((step, index) => {
                            return (
                                <tr key={index}>
                                    <td>{step.date}</td>
                                    <td>{step.distance}</td>
                                    <td><button type="button" onClick={() => deleteStep(step.id)}>✘</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            }
        </div>
    )
}

export default Steps;