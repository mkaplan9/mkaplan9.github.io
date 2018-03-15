// Import csv A of the form Category A,Pref 1,Pref 2,... and analogous for csv B
// Make an object that stores name, category, prefs in order for each person
// Match up according to Miraj algo Gale-Shapley (accomodate no match)
// Output pairs


const csv_a = "" //
const csv_b = ""//

// Convert to objects
let a_objects = ""
let b_objects = ""

a_objects = {
  "1": {
    preference_keys: ["2","1"],
    is_paired: false,
    match: null
  },
  "2": {
    preference_keys: ["1","2"],
    is_paired: false,
    match: null
  }
}

b_objects = {
  "1": {
    preference_keys: ["2","1"],
    is_paired: false,
    match: null
  },
  "2": {
    preference_keys: ["1","2"],
    is_paired: false,
    match: null
  }
}

console.log("Set vars")

var is_stable = false
var i = 0
while ((!is_stable) && (i < 100)) {                                                    
  i += 1
  console.log(i)
  Object.keys(a_objects).forEach(function (a_object_key) {              // For each A object
    console.log("In for loop")
    a_object = a_objects[a_object_key]                                  // Get object
    if (!a_object.is_paired) {                                          // If not paired
      let potential_match_b
      let old_match
      stop = false
      a_object.preference_keys.forEach(function (pref_object_key) {   // For each pref in order
        if (!stop) {
          potential_match_b = b_objects[pref_object_key]              // Get the pref
          if (switch_to(potential_match_b, a_object_key)) {                  // If the pref prefers A point to each other
            old_match_a_key = potential_match_b.match
            var old_match_a = a_objects[old_match_a_key]
            if (old_match_a) {
              old_match_a.match = null
              old_match_a.is_paired = false
            }
            potential_match_b.match = a_object_key
            potential_match_b.is_paired = true
            a_object.match = pref_object_key
            a_object.is_paired = true
            stop = true                                                // Break from loop
          }
        }
      })
    }
  })

  is_stable = true
  Object.keys(a_objects).forEach(function (a_object_key) {
    var a_object = a_objects[a_object_key]
    if (!a_object.is_paired) {
      is_stable = false
    }
  })
}

console.log(a_objects)
console.log(b_objects)

function switch_to(object_with_preference, candidate_key) {
  var current_match_key = object_with_preference.match
  var prefs = object_with_preference.preference_keys
  if ((current_match_key == null) || (prefs.indexOf(candidate_key) < prefs.indexOf(current_match_key))) {
    return true
  }
  return false
}
